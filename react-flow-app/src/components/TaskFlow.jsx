import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

const API_URL = "http://127.0.0.1:8000/tasks"; // FastAPI backend URL

function TaskFlow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [notification, setNotification] = useState(null);

  // Fetch Tasks
  const fetchTasks = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      const formattedNodes = data.map((task, index) => ({
        id: task.id.toString(),
        data: { label: task.name },
        position: { x: index * 200, y: 100 },
        style: {
          background: "#222",
          color: "#fff",
          padding: "12px",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          cursor: "pointer",
          transition: "0.3s",
        },
      }));
      setNodes(formattedNodes);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Add Task
  const addTask = async () => {
    if (!taskName.trim()) return;

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: taskName }),
      });

      if (!response.ok) throw new Error("Failed to add task");

      const newTask = await response.json();
      const formattedTask = {
        id: newTask.id.toString(),
        data: { label: newTask.name },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        style: {
          background: "#4CAF50",
          color: "white",
          padding: "12px",
          borderRadius: "12px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      };

      setNodes((prevNodes) => [...prevNodes, formattedTask]);
      setTaskName(""); // Clear input field
      showNotification("Task added successfully!", "success");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Delete Task
  const deleteTask = async (id) => {
    try {
      await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== id));
      showNotification("Task deleted!", "error");
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Update Task (Rename)
  const updateTask = async (id) => {
    const newName = prompt("Enter new task name:");
    if (!newName || newName.trim() === "") return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      setNodes((prevNodes) =>
        prevNodes.map((node) =>
          node.id === id ? { ...node, data: { label: newName } } : node
        )
      );
      showNotification("Task updated successfully!", "info");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  // Handle Notifications
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle Node Changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle Edge Creation
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div style={{ display: "flex", height: "100vh", width: "100vw" }}>
      {/* Sidebar Panel */}
      <div
        style={{
          width: "300px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(12px)",
          padding: "20px",
          color: "white",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <h2>Task List</h2>

        {/* Input and Add Button */}
        <div style={{ marginBottom: "15px" }}>
          <input
            type="text"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            placeholder="Enter task name..."
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "8px",
              border: "none",
              fontSize: "16px",
              outline: "none",
              marginBottom: "8px",
            }}
          />
          <button
            onClick={addTask}
            style={{
              width: "100%",
              padding: "10px",
              background: "#00d4ff",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Add Task
          </button>
        </div>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {nodes.map((node) => (
            <li
              key={node.id}
              style={{
                background: "#444",
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "8px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              {node.data.label}
              <div>
                <button
                  onClick={() => updateTask(node.id)}
                  style={{
                    background: "#00d4ff",
                    color: "white",
                    border: "none",
                    padding: "5px",
                    cursor: "pointer",
                    borderRadius: "4px",
                    marginRight: "5px",
                  }}
                >
                  ✏️
                </button>
                <button
                  onClick={() => deleteTask(node.id)}
                  style={{
                    background: "red",
                    color: "white",
                    border: "none",
                    padding: "5px",
                    cursor: "pointer",
                    borderRadius: "4px",
                  }}
                >
                  ❌
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Main TaskFlow */}
      <div style={{ flex: 1, position: "relative" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onConnect={onConnect}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>

      {/* Notification */}
      {notification && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            padding: "10px",
            background: notification.type === "error" ? "red" : "#4CAF50",
            color: "white",
            borderRadius: "5px",
          }}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}

export default TaskFlow;
