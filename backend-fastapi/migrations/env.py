import asyncio
from logging.config import fileConfig
from sqlalchemy.ext.asyncio import create_async_engine
from app.db.config import get_database_url
from app.models.food import Base
from alembic import context


config = context.config
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

target_metadata = Base.metadata

async def run_migrations_online():
    connectable = create_async_engine(get_database_url(), echo=True)

    async with connectable.connect() as connection:
        await connection.run_sync(
            lambda conn: context.configure(
                connection=conn,
                target_metadata=target_metadata
            )
        )

        async with context.begin_transaction():
            await connection.run_sync(lambda conn: context.run_migrations())


if context.is_offline_mode():
    raise Exception('Offline mode not supported')
else:
    asyncio.run(run_migrations_online())
