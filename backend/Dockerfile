FROM tiangolo/uvicorn-gunicorn-fastapi:python:3.11.5

WORKDIR /src

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "src.main:app", "--host", "127.0.0.1", "--port", "8000"]

