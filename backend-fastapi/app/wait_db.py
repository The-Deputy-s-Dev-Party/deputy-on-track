import asyncio
import os
import sys
import uvicorn
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.db.config import get_database_url


async def check_db_connection(url: str, max_attempts: int = 20, delay: float = 3.0) -> bool:
    print('Checking db connection...')
    for attempt in range(1, max_attempts+1):
        try:
            engine = create_async_engine(url, echo=False)
            async with engine.connect() as conn:
                await conn.execute(text('SELECT 1'))
                print('DB is ready!')
                return True
        except Exception as e:
            print(f'Attempt {attempt}/{max_attempts} failed: {e}')
            if attempt == max_attempts:
                print('Max attempts reached, giving up.')
                return False
            await asyncio.sleep(delay)
    return False


async def run_migrations():
    print('Running db migrations...')
    try:
        result = os.system('poetry run alembic upgrade head')
        if result != 0:
            raise RuntimeError('Alembic migrations failed')
        print('Migrations applied successfully!')
    except Exception as e:
        print(f'Migration failed: {e}')
        sys.exit(1)


async def main():
    url = get_database_url()
    if not await check_db_connection(url):
        sys.exit(1)
    await run_migrations()
    print('Starting application...')
    config = uvicorn.Config(
        app='app.main:app',
        host='0.0.0.0',
        port=int(os.environ.get('BACKEND_FASTAPI_PORT')),
        reload=True
    )
    server = uvicorn.Server(config)
    await server.serve()


if __name__ == '__main__':
    asyncio.run(main())
