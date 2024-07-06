import os
import sys
from fastapi.middleware.cors import CORSMiddleware
sys.path.insert(1, os.path.join(sys.path[0], '..'))

from backend.src.queries.orm import create_tables


from fastapi import FastAPI
from src.api.endpoints import router


app = FastAPI()



origins = [
    "http://localhost",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.include_router(router)

@app.on_event("startup")
async def startup():
    create_tables()



# insert_data("Разработчик", 100000, "Python, SQL", "Удаленная работа", "fulltime")

# select_worker()

#update_worker()

