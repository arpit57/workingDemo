import mysql.connector

# Database credentials
db_config = {
    "host": "localhost",
    "port": 3306,
    "user": "root",
    "password": "root",
    "database": "fruit"
}

# Function to establish a database connection
def get_db_connection():
    return mysql.connector.connect(**db_config)
