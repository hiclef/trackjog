#!/bin/bash
# extract_new_data
# Script to look for new data in Garmin Forerunner,
# convert it to GPX format, and upload it to the
# MySQL server.


# Check that watch is plugged into USB port
if [ ! -e ACTIVITY_DATA ]; then
	echo "Garmin Forerunner not connected!"
	echo "Please connect to USB port and try again."
	exit 1	# terminate with error code
fi


# Prompt user for mysql-client password
echo "Enter password for server:"
read -s pwd

# Verify password. If correct, retrieve file timestamp of
# most recent upload to database.
# FIX - timestamp for symbolic link ACTIVITY_DATA is '2013-12-31 19:00:38'; find out why.
#timestamp='2014-01-01 00:00:00'
timestamp=$(python3 get_timestamp.py $pwd)
if [ $? -eq 1 ]; then
    	echo "Incorrect password: failed to connect to database."
	exit 1	# terminate with error code
else
	echo "Latest timestamp: $timestamp"
	echo
fi


# Check for new files
if [ ! $(find ACTIVITY_DATA/ -newermt "$timestamp") ]; then
	echo "No new files: database up to date."
	exit 0
fi

# Get new files, and extract and upload data from each
find ACTIVITY_DATA/ -newermt "$timestamp" | while read line; do

	echo -n "Converting ${line#ACTIVITY_DATA/} to GPX..."
	gpsbabel -i garmin_fit -f $line -o gpx -F _activity_.gpx
	echo "Done."
	#tail _activity_.gpx

	datetime_raw=$(stat -c %y $line)
	datetime=${datetime_raw:0:19}
	python3 upload_data.py $pwd "$datetime"
	echo "Timestamp: $datetime"
	echo

	rm -f _activity_.gpx
done


# Terminate script succesfully
echo "Data extraction complete."
exit 0
