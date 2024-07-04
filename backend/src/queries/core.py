from sqlalchemy import text, insert, select, update
from database import sync_engine
from models import metadata_obj, vacancies



def corius():
    with sync_engine.connect() as conn:
        res = conn.execute(text("SELECT VERSION()"))
        print(f"{res=}")


def create_tables():
    sync_engine.echo = False
    metadata_obj.drop_all(sync_engine)
    metadata_obj.create_all(sync_engine)
    sync_engine.echo = True



def insert_data():
    with sync_engine.connect() as conn:
        # stmt = """ INSERT INTO vacancies (title) VALUES
        # ('Altarf'),
        # ('Aldebaran');"""
        stmt = insert(vacancies).values(
            [
                {"title": "Altarf"},
                {"title": "Aldebaran"},
            ]
        )

        conn.execute(stmt)
        conn.commit()

def select_workers():
    with sync_engine.connect() as conn:
        query = select(vacancies)
        result = conn.execute(query)
        vacanc = result.all()
        print(f"{vacanc=}")


def update_worker(worker_id: int=2, new_title: str="Asoroun"):
    with sync_engine.connect() as conn:
        # stmt = text("UPDATE vacancies SET title=:title WHERE id=:id")
        # stmt = stmt.bindparams(title=new_title, id=worker_id)

        stmt = (
            update(vacancies)
            .values(title=new_title)
            #.where(vacancies.c.id==worker_id)
            .filter_by(id=worker_id)
        )

        conn.execute(stmt)
        conn.commit()