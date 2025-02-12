from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)

# Database setup
conn = sqlite3.connect("tasks.db", check_same_thread=False)
cursor = conn.cursor()
cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL
    )
""")
conn.commit()

# Task Model
class Task(BaseModel):
    name: str  # Remove 'id' since the DB will generate it

# Fetch all tasks
@app.get("/tasks", response_model=List[dict])
async def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    tasks = [{"id": row[0], "name": row[1]} for row in cursor.fetchall()]
    return tasks

# Add a new task
@app.post("/tasks", response_model=dict)
async def add_task(task: Task):
    cursor.execute("INSERT INTO tasks (name) VALUES (?)", (task.name,))
    conn.commit()
    task_id = cursor.lastrowid  # Get the auto-generated ID
    return {"id": task_id, "name": task.name}
