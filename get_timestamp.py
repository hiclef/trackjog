# get_timestamp
# Script to retrieve latest data timestamp from
# MySQL trackJog database.
import mysql.connector as MSC
import sys


if len(sys.argv) < 2:
    print("Password needed to execute script.")
    print("Please try again and provide password as argument.")
    exit(1)
else:
    pwd = sys.argv[1]

cnx = MSC.connect(user='matthew', password=pwd, host='10.0.0.129', database='trackJog')
cursor = cnx.cursor()
cursor.execute("SELECT MAX(timestamp) FROM routes_test")
data = next(cursor)[0]

if data:
    print(str(data))
else:
    print("2014-01-01 00:00:00")
