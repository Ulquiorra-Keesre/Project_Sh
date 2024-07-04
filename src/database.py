from sqlalchemy import create_engine, URL, text
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker, async_session
from sqlalchemy.orm import sessionmaker, Session, DeclarativeBase
from config import settings

sync_engine = create_engine(
    url = settings.DATABASE_URL_psycopg,
    echo = True)

session_factory = sessionmaker(sync_engine)

class Base(DeclarativeBase):
    pass