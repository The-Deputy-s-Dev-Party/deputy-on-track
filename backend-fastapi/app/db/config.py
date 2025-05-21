import os

user = os.environ.get('MYSQL_USER')
password = os.environ.get('MYSQL_PASSWORD')
host = os.environ.get('MYSQL_HOST')
port = os.environ.get('MYSQL_PORT')
name = os.environ.get('MYSQL_DATABASE')

def get_database_url() -> str:
    url = f'mysql+asyncmy://{user}:{password}@{host}:3306/{name}'
    return url
