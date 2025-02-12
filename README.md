TaskFlow - Interactive Task Management with React Flow & FastAPI

TaskFlow is a dynamic task management application that allows users to create, update, delete, and visualize tasks using an interactive node-based UI. It leverages React Flow for the frontend and FastAPI for the backend, with seamless data persistence.

Features

Add, Update, and Delete Tasks dynamically

Interactive Node-Based UI for task visualization

Persistent Data Storage using a FastAPI backend

REST API Integration for seamless frontend-backend communication

Styled UI with Gradient Effects and Shadows

Tech Stack

Frontend:

React.js

React Flow

JavaScript (ES6+)

CSS for UI Styling

Backend:

FastAPI


Database:

SQLite

Installation & Setup

Backend (FastAPI)

Clone the repository:

git clone https://github.com/your-username/taskflow.git
cd taskflow/backend


Install dependencies:

pip install fastapi uvicorn pydantic

Run the FastAPI server:

uvicorn main:app --reload

The API will be accessible at: http://127.0.0.1:8000

Frontend (React.js + React Flow)

Navigate to the frontend folder:

cd ../frontend

Install dependencies:

npm install

Run the React app:

npm start

The frontend will be available at: http://localhost:5173

API Endpoints

Get all tasks

Endpoint: GET /tasks

Response:

[
  { "id": 1, "name": "Task 1" },
  { "id": 2, "name": "Task 2" }
]

