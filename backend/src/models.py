from sqlalchemy import Table, String, Integer, Column, MetaData
from sqlalchemy.orm import Mapped, mapped_column
from src.database import Base
import enum
from typing import Optional

metadata_obj = MetaData()

vacancies = Table(
    "vacancies",
    metadata_obj,
    Column("id", Integer, primary_key=True),
    Column("title", String),
    Column("salary", Integer),
    Column("skills", String),
    Column("employment", String),
    Column("workload", String),
)

class Employment(enum.Enum):
    remote = "Удаленная работа"
    fullDay = "Полный день"
    flexible = "Гибкий график"
    shift = "Сменный график"

class Workload(enum.Enum):
    part = "parttime"
    full = "fulltime"
 

class VacanciesOrm(Base):
    __tablename__ = "vacancies"
    
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    title: Mapped[str] = mapped_column(String)
    salary: Mapped[Optional[int]]
    skills: Mapped[Optional[str]]
    employment: Mapped[Employment] = mapped_column(String)
    workload: Mapped[Workload] = mapped_column(String)