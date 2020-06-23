# extract_coords
# A module for turning Garmin .gpx 'trk's into global coordinate paths
# and then formatting and uploading the data to a MySQL server.
from re import sub
import xml.etree.ElementTree as ET
import mysql.connector as MSC


with open('activity1.gpx', 'r') as gpx_route:
    tree = ET.parse(gpx_route)
    root = tree.getroot()


def upload_data(pwd: str) -> None:
    print("Starting upload script.")

    cnx = MSC.connect(user='matthew', password=pwd, host='10.0.0.129', database='trackJog')
    cursor = cnx.cursor()
    print("Connected to trackJog database.")

    assert root[2].tag == '{http://www.topografix.com/GPX/1/0}trk'
    trk = root[2]
    trksegs = list(trk)
    print(f"{len(trksegs)} segments found.")

    for i,trkseg in enumerate(trksegs):

        trkpts = list(trkseg)
        assert len(trkpts) >= 2
        print(f"Uploading segment {i+1}: {len(trkpts)} points to add.")

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
            if j > 0 and j%100 == 0: print(f"Added points {j-100+1}-{j}.")


            if j == 0 or j == len(trkpts)-1:

                TIME = sub('T',' ',DT[:-1])
                ID = cursor.lastrowid

                if j == 0:
                    flag_point = ('start', ID)
                    START_TIME = TIME
                    START_ID = ID
                else:
                    flag_point = ('stop', ID)
                    STOP_TIME = TIME
                    STOP_ID = ID

                update_point = ("UPDATE points_test "
                                "SET flag = %s "
                                "WHERE id = %s"
                                )

                cursor.execute(update_point, flag_point)


        data_route = (START_TIME, STOP_TIME, START_ID, STOP_ID)
        add_route = ("INSERT INTO routes_test "
                     "(start_time, stop_time, start_point, stop_point) "
                     "VALUES (%s, %s, %s, %s)"
                    )

        cursor.execute(add_route, data_route)
        print(f"Finished uploading segment {i+1}.")

    cnx.commit()
    print("Upload complete.")
