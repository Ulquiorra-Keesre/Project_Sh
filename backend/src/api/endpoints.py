from fastapi import APIRouter
from pydantic import BaseModel
from backend.src.queries.orm import insert_data, select_worker, fetch_vacancies

class SearchRequest(BaseModel):
    keyword: str

router = APIRouter()

@router.post("/items")
def create_items(request: SearchRequest):
   
    vacancies = fetch_vacancies(request.keyword)

    # for vacancy in vacancies:
    #     title = vacancy.get('name', 'N/A')
    #     salary = vacancy.get('salary', {}).get('from', 'N/A')
    #     skills = vacancy.get('snippet', {}).get('requirement', 'N/A')
    #     employment = vacancy.get('employment', {}).get('id', 'N/A')
    #     workload = vacancy.get('schedule', {}).get('id', 'N/A')
    #     insert_data(title, salary, skills, employment, workload)
    # return {"status": "success"}

    for vacancy in vacancies:

        title = vacancy.get('name', 'N/A')
        salary = vacancy.get('salary') or {}
        salary_from = salary.get('from', 0)
        snippet = vacancy.get('snippet') or {}
        skills = snippet.get('requirement', 'N/A')
        employment = vacancy.get('employment', 'N/A')
        employment_id = employment.get('id', 'N/A')
        schedule = vacancy.get('schedule', 'N/A')
        schedule_id = schedule.get('id', 'N/A')
        insert_data(title, salary_from, skills, employment_id, schedule_id)
    return {"status": "success"}

@router.get("/items")
def read_items():
    workers = select_worker()
    return workers
