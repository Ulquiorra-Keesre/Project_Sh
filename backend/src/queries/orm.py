from sqlalchemy import text, insert, select
from backend.src.database import sync_engine, session_factory
from backend.src.models import metadata_obj, VacanciesOrm, Workload, Employment

import requests

def fetch_vacancies(search_text=None, per_page=20, area=1):
    url = "https://api.hh.ru/vacancies"
    params = {
        "per_page": per_page,
        "area": area
    }

    if search_text:
        params["text"] = search_text

    response = requests.get(url, params=params)
    data = response.json()
    filtered_vacancies = []
    for vacancy in data['items']:
        if search_text.lower() in (str(vacancy).lower().split(' ')):
            filtered_vacancies.append(vacancy)
    
    return filtered_vacancies, data

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

# def select_worker():
#     with session_factory() as session:
#         # worker_id = 2
#         # worker_A = session.get(VacanciesOrm, worker_id)
#         query = select(VacanciesOrm)
#         result = session.execute(query)
#         workers = result.scalars().all()
#         # print(f"{workers=}")
#         # print(workers[0][0].title)
#         return workers

def select_worker():
    with session_factory() as session:
        query = select(VacanciesOrm)
        result = session.execute(query)
        workers = result.scalars().all()
        
        worker_dicts = [
            {
                'id': worker.id,
                'title': worker.title,
                'salary': worker.salary,
                'skills': worker.skills,
                'employment': worker.employment,
                'workload': worker.workload
            }
            for worker in workers
        ]
        
        return worker_dicts


def update_worker(worker_id: int=2, new_title: str="Asoroun"):
    with session_factory() as session:
        worker_A = session.get(VacanciesOrm, worker_id)
        worker_A.title = new_title
        session.commit()