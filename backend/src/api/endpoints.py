from fastapi import APIRouter
from pydantic import BaseModel
from queries.orm import insert_data, select_worker, fetch_vacancies

class SearchRequest(BaseModel):
    keyword: str

router = APIRouter()

@router.post("/items")
def create_items(request: SearchRequest):
    vacancies = fetch_vacancies(request.keyword)
    for vacancy in vacancies:
        title = vacancy.get('name', 'N/A')
        salary = vacancy.get('salary', {}).get('from', 'N/A')
        skills = vacancy.get('snippet', {}).get('requirement', 'N/A')
        employment = vacancy.get('employment', {}).get('id', 'N/A')
        workload = vacancy.get('schedule', {}).get('id', 'N/A')
        insert_data(title, salary, skills, employment, workload)
    return {"status": "success"}

@router.get("/items")
def read_items():
    workers = select_worker()
    return workers
