import os
import sys
sys.path.insert(1, os.path.join(sys.path[0], '..'))

#from queries.core import create_tables, insert_data
from queries.orm import create_tables, insert_data
from queries.orm import select_worker
#from queries.orm import update_worker

from fastapi import FastAPI
from api.endpoints import router


app = FastAPI()

app.include_router(router)

@app.on_event("startup")
async def startup():
    create_tables()



# insert_data("Разработчик", 100000, "Python, SQL", "Удаленная работа", "fulltime")

# select_worker()

#update_worker()

