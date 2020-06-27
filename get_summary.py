# get_summary
# Retrieves a list of all of the routes in the
# MySQL database, and prints an overview to the console.
import datetime
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


# Execute command to get all routes in database
cursor.execute("SELECT * FROM routes")
data = cursor

for record in data:
    print(str(record[0]), f"{record[2]-record[1]} seconds")
