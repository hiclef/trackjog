#!/bin/bash
# extract_new_data
# Script to look for new data in Garmin Forerunner,
# convert it to GPX format, and upload it to the
# MySQL server.

#echo "Running script:"

if [ ! -e ACTIVITY_DATA ]; then
	echo "Garmin Forerunner not connected!"
	echo "Please connect to USB port and try again."
	exit 1
fi

# FIX - insert credential check here

echo "Enter password for server:"
read -s pwd

timestamp=$(python3 get_timestamp.py $pwd)
echo "Latest timestamp: $timestamp"
echo

# FIX - timestamp for symbolic link ACTIVITY_DATA is '2013-12-31 19:00:38'; find out why.
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

echo "Data extraction complete."
exit 0




