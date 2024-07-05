from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, DeclarativeBase
from backend.src.config import settings

sync_engine = create_engine(
    url = settings.DATABASE_URL_psycopg,
    echo = True)

session_factory = sessionmaker(sync_engine)

class Base(DeclarativeBase):
    pass