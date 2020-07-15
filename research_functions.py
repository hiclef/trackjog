# get_timestamp
# Script to retrieve latest data timestamp from MySQL trackjog server.
from math import acos, atan2, sqrt
import matplotlib.pyplot as plt
import mysql.connector as msc
import sys


# Check for an argument
# if len(sys.argv) < 2:
#     print("Password needed to execute script.")
#     print("Please try again and provide password as argument.")
#     exit(1)
# else:
#     pwd = sys.argv[1]

pwd = "G40inp237"

# Vefify password by attempting to connect to MySQL server
try:
    cnx = msc.connect(user='matthew', password=pwd, host='10.0.0.129', database='trackjog_test')
    cursor = cnx.cursor()
except msc.errors.ProgrammingError:
    print("Incorrect password: failed to connect to database.")
    exit(1)

# Start, stop point ids for sample route
start, stop = 989, 3919
# start, stop = 3920, 6953
# start, stop = 6954, 10554
# start, stop = 10555, 12697
# start, stop = 12698, 20006
# start, stop = 20007, 25334
# start, stop = 25335, 27134
# start, stop = 27135, 32871
# start, stop = 32872, 37815
# start, stop = 37816, 42375
# start, stop = 42376, 43815
# start, stop = 43816, 47409
# start, stop = 47410, 54226
# start, stop = 54227, 59423
# start, stop = 59424, 64354
# start, stop = 64355, 69015
# start, stop = 69016, 73614
# start, stop = 73615, 78638
# start, stop = 78639, 83289
# start, stop = 83290, 87434
# start, stop = 87435, 95932
# start, stop = 95933, 97368

sql_points = "SELECT latitude, longitude FROM points WHERE id BETWEEN %s AND %s"
cursor.execute(sql_points, (start, stop))
data = cursor
points = [ (float(d[0]), float(d[1])) for d in data ]
cnx.close()

# for p in points: print(p)

# lons = [ p[1] for p in points ]
# lats = [ p[0] for p in points ]
# plt.plot(lons, lats)
# plt.show()

def direction(p0, p1):
    y = p1[1] - p0[1]
    x = p1[0] - p0[0]
    return atan2(y,x)

dirs = [ direction(points[i], points[i+1]) for i in range(len(points)-1) ]
plt.plot(dirs)
plt.show()

def diff_angle(v0, v1):
    len0 = sqrt(v0[0]*v0[0] + v0[1]*v0[1])
    len1 = sqrt(v1[0]*v1[0] + v1[1]*v1[1])
    dot_product = v0[0]*v1[0] + v0[1]*v1[1]
    cosine = dot_product / (len0 * len1)
    return acos(cosine)

vectors = [ (points[i+1][0]-points[i][0], points[i+1][1]-points[i][1]) for i in range(len(points)-1) ]
d_angles = [ diff_angle(vectors[i], vectors[i+1]) for i in range(len(vectors)-1) ]
plt.plot(d_angles)
plt.show()

