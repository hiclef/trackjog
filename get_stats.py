# get_stats
# Retrives the list of coordinates for a given route,
# and computes various statistics.
import datetime
import geopy.distance as GD
import itertools
import matplotlib.pyplot as PLT
import mysql.connector as MSC
import sys


# Check for an argument
if len(sys.argv) < 2:
    print("Password needed to execute script.")
    print("Please try again and provide password as argument.")
    exit(1)
else:
    pwd = sys.argv[1]

# Vefify password by attempting to connect to MySQL server
try:
    cnx = MSC.connect(user='matthew', password=pwd, host='10.0.0.129', database='trackjog_test')
    cursor = cnx.cursor()
except MSC.errors.ProgrammingError:
    print("Incorrect password: failed to connect to database.")
    exit(1)


# Timestamp of first uploaded route
DT = "2020-06-22 11:08:54"

# Get start and stop ids for route
datetime_route = (DT,)
get_route = ("SELECT start_point, stop_point FROM routes "
             "WHERE timestamp = %s"
            )

cursor.execute(get_route, datetime_route)
endpoints = next(cursor)
print("Point range:", endpoints)

# Get list of coordinates for route
range_points = (endpoints[0], endpoints[1])
get_points = ("SELECT latitude, longitude FROM points "
              "WHERE id BETWEEN %s AND %s"
             )

cursor.execute(get_points, range_points)
data = list(cursor)
print(len(data), "points")

# Calculate distance, speed data
segments = [ GD.vincenty(data[i],data[i+1]).km for i in range(len(data)-1) ]
total_dist = sum(segments)
avg_speed = 3600 * total_dist / len(segments)
print("Total total_dist:", round(total_dist,3), "km")
print("Average speed:", round(avg_speed, 3), "km/hr")
#print("Max speed:", round(3600 * max(segments), 3), "km/hr")
print("Max speed:", round(1000 * max(segments), 3), "m/sec")

# Plot distance vs. time
distances = list(itertools.accumulate(segments))
PLT.plot(distances)
PLT.show()

# Plot speed vs. time
PLT.plot(segments)
PLT.show()
