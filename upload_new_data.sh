#!/bin/bash
# Script to look for new data in Garmin Forerunner,
# convert it to GPX format, and upload it to the
# MySQL server.

echo "Running script..."

# find ACTIVITY_DATA/ -newermt '2020-06-10 16:09:34'
# gpsbabel -i garmin_fit -f $FILE -o gpx -F {?}
