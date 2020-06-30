# trackjog

Get access to clean, simply-formatted data from your GPS watch.

## Data format

**trackjog** uses a MySQL database with two tables: *points* and *routes*.

### *points*
| Attribute    | Data Type         |
| ------------ | ----------------- |
| id           | INT (primary key) |
| latitude     | DECIMAL           |
| longitude    | DECIMAL           |

### *routes*
| Attribute    | Data Type     |
| ------------ | ------------- |
| timestamp    | DATETIME      |
| start point  | *points* id   |
| stop point   | *points* id   |


## Contact
[Matthew Rumizen](mailto:matthew.rumizen@gmail.com) - developer
