from sqlalchemy import text, insert, select
from database import sync_engine, session_factory
from models import metadata_obj, VacanciesOrm, Workload, Employment

def create_tables():
    sync_engine.echo = False
    metadata_obj.drop_all(sync_engine)
    metadata_obj.create_all(sync_engine)
    sync_engine.echo = True

def insert_data(title, salary, skills, employment, workload):
    with session_factory() as session:
        vacancy = VacanciesOrm(title=title, salary=salary, skills=skills, employment=employment, workload=workload)
        session.add(vacancy)
        session.commit()

def select_worker():
    with session_factory() as session:
        # worker_id = 2
        # worker_A = session.get(VacanciesOrm, worker_id)
        query = select(VacanciesOrm)
        result = session.execute(query)
        workers = result.all()
        print(f"{workers=}")
        print(workers[0][0].title)


def update_worker(worker_id: int=2, new_title: str="Asoroun"):
    with session_factory() as session:
        worker_A = session.get(VacanciesOrm, worker_id)
        worker_A.title = new_title
        session.commit()