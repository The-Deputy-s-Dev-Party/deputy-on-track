import os

def get_database_url() -> str:
    url = f'mysql+asyncmy://{os.environ.get('MYSQL_USER')}:{os.environ.get('MYSQL_PASSWORD')}@{os.environ.get('MYSQL_HOST')}:{os.environ.get('MYSQL_PORT')}/{os.environ.get('MYSQL_DATABASE')}'
    return url