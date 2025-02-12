from sqlalchemy import create_engine, Column, Integer, String, Text, Enum, TIMESTAMP
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

DATABASE_URL = "mysql+mysqlconnector://root:root%40123@localhost/taskflow_db"

# Connect to MySQL database
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# Task model
class Task(Base):
    __tablename__ = "tasks"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), nullable=False)
    description = Column(Text)
    status = Column(Enum("todo", "in-progress", "done", name="task_status"), default="todo")
    created_at = Column(TIMESTAMP, server_default="CURRENT_TIMESTAMP")

# Create tables
Base.metadata.create_all(bind=engine)
