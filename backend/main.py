from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import sqlite3

app = FastAPI()

# Enable CORS (Allows requests from all origins)
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
    name: str  

class TaskResponse(Task):
    id: int

# Fetch all tasks (READ)
@app.get("/tasks", response_model=List[TaskResponse])
async def get_tasks():
    cursor.execute("SELECT * FROM tasks")
    tasks = [{"id": row[0], "name": row[1]} for row in cursor.fetchall()]
    return tasks

# Fetch a specific task by ID (READ)
@app.get("/tasks/{task_id}", response_model=TaskResponse)
async def get_task(task_id: int):
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    row = cursor.fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Task not found")
    return {"id": row[0], "name": row[1]}

# Add a new task (CREATE)
@app.post("/tasks", response_model=TaskResponse)
async def add_task(task: Task):
    cursor.execute("INSERT INTO tasks (name) VALUES (?)", (task.name,))
    conn.commit()
    task_id = cursor.lastrowid  
    return {"id": task_id, "name": task.name}

# Update an existing task (UPDATE)
@app.put("/tasks/{task_id}", response_model=TaskResponse)
async def update_task(task_id: int, updated_task: Task):
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    row = cursor.fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Task not found")

    cursor.execute("UPDATE tasks SET name = ? WHERE id = ?", (updated_task.name, task_id))
    conn.commit()
    return {"id": task_id, "name": updated_task.name}

# Delete a task (DELETE)
@app.delete("/tasks/{task_id}", response_model=dict)
async def delete_task(task_id: int):
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    row = cursor.fetchone()
    if row is None:
        raise HTTPException(status_code=404, detail="Task not found")

    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    return {"message": "Task deleted successfully", "id": task_id}
