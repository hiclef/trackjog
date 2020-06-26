# upload_data
# Script for turning Garmin .gpx 'trk's into global coordinate paths
# and then formatting and uploading the data to my MySQL server.
from re import sub
import sys
import xml.etree.ElementTree as ET
import mysql.connector as MSC


# Read temporary file _activity_.gpx, created by 'exctract_new_data.sh'
with open('_activity_.gpx', 'r') as gpx_route:
    tree = ET.parse(gpx_route)
    root = tree.getroot()

# Check for proper number of arguments; retrieve password and file timestamp
if len(sys.argv) < 3:
    print("Password and timestamp needed to execute script.")
    print("Please try again and provide both arguments.")
    exit(1)
else:
    pwd = sys.argv[1]
    TIMESTAMP = sys.argv[2]


# Connect to MySQL server
cnx = MSC.connect(user='matthew', password=pwd, host='10.0.0.129', database='trackJog')
cursor = cnx.cursor()
print("Connected to trackjog database.")

# Check that data is clean, and parse into Python lists
assert root[2].tag == '{http://www.topografix.com/GPX/1/0}trk'
trk = root[2]
trksegs = list(trk)
unit = "segments" if len(trksegs) > 1 else "segment"
print(f"{len(trksegs)} {unit} found.")


# Upload each trkseg individually (usually just 1)
for i,trkseg in enumerate(trksegs):

    trkpts = list(trkseg)
    assert len(trkpts) >= 2
    print(f"Uploading segment {i+1}: {len(trkpts)} points to add.")

    # Within trkseg, upload each point as a single 'point'
    for j,trkpt in enumerate(trkpts):

        DT = sub('T', ' ', trkpt[0].text[:-1])
        LAT = float( trkpt.attrib['lat'] )
        LON = float( trkpt.attrib['lon'] )

        data_point = (LAT, LON, DT)
        add_point = ("INSERT INTO points_test "
                     "(latitude, longitude, time) "
                     "VALUES (%s, %s, %s)"
                    )

        cursor.execute(add_point, data_point)
        if j > 0 and j%300 == 0: print(f"Added points {j-300+1}-{j}.")

        # Special action for first and last point
        if j == 0 or j == len(trkpts)-1:

            ID = cursor.lastrowid

            if j == 0:
                flag_point = ('start', ID)
                START_ID = ID   # save ID of first point
            else:
                flag_point = ('stop', ID)
                STOP_ID = ID    # save ID of last point
                print(f"Added points {300*(j//300) + 1}-{j}.")

            update_point = ("UPDATE points_test "
                            "SET flag = %s "
                            "WHERE id = %s"
                            )

            # Add 'start'/'stop' flag for first/last point
            cursor.execute(update_point, flag_point)

    data_route = (TIMESTAMP, START_ID, STOP_ID)
    add_route = ("INSERT INTO routes_test "
                 "(timestamp, start_point, stop_point) "
                 "VALUES (%s, %s, %s)"
                )

    # Upload 'route' record for trkseg using IDs of first, last points
    cursor.execute(add_route, data_route)
    print(f"Finished uploading segment {i+1}.")


# Save changes to database and exit
cnx.commit()
print("Upload complete.")
