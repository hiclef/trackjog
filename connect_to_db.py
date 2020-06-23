# connect_to_db
# A module for creating a MySQL 'cursor' object connected to MySQL server.

# from typing import List, Tuple
# import xml.etree.ElementTree as ET
import mysql.connector as MSC

def get_connection(pwd: str):
    cnx = MSC.connect(user='matthew', password=pwd, host='10.0.0.129', database='trackJog')
    return cnx
