#!/bin/bash
# Script to look for new data in Garmin Forerunner,
# convert it to GPX format, and upload it to the
# MySQL server.

echo "Running script:"

if [ ! -e ACTIVITY_DATA ]; then
	echo "Garmin Forerunner not connected!"
	echo "Please connect to USB port and try again."
	exit 1
fi

find ACTIVITY_DATA/ -newermt '2020-06-10 16:09:34' | while read line; do
	echo -n "Converting $line to GPX..."
	gpsbabel -i garmin_fit -f $line -o gpx -F _activity_.gpx
	# tail _activity_.gpx
	# python3 extract_data.py _activity_.gpx
	rm -f _activity_.gpx
	echo "Done."
done

exit 0




