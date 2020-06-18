# extract_coords
# A test module for turning .osm 'ways' into global coordinate paths.
# Automatically uploads 'sample_map.osm' from current directory.

from typing import List, Tuple
import xml.etree.ElementTree as ET

with open('sample_map.osm', 'r') as sample_map:
    tree = ET.parse(sample_map)
    all_nodes = [ n for n in tree.getroot() if n.tag == 'node' ]

def extract_coords(way) -> List[Tuple[float,float]]:
    """Takes a 'way' element from an .osm file and returns
    a list of (latitude, longitude) coordinates."""

    # assert type(way) == 'xml.etree.ElementTree.Element'

    node_ids = [ n.attrib['ref'] for n in way if n.tag == 'nd' ]
    coords = []

    for node_id in node_ids:
        for n in all_nodes:
            if n.attrib['id'] == node_id:
                coords.append( (n.attrib['lat'], n.attrib['lon']) )
                break

    return coords
