import { useState, useCallback, useEffect } from "react";
import ReactFlow, {
  Background,
  Controls,
  applyNodeChanges,
  addEdge,
} from "reactflow";
import "reactflow/dist/style.css";

function TaskFlow() {
  const [nodes, setNodes] = useState([]);
  const [edges, setEdges] = useState([]);
  const [taskName, setTaskName] = useState("");

  // Fetch tasks from API on mount
  const fetchTasks = async () => {
    try {
      const res = await fetch("http://127.0.0.1:8000/tasks"); // Match FastAPI port
      const data = await res.json();
      const formattedNodes = data.map((task) => ({
        id: task.id.toString(),
        data: { label: task.name },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        style: {
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
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

  // Function to add a new task
  const addTask = async () => {
    if (!taskName.trim()) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: taskName }), // Send only the name
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const newTask = await response.json();

      const formattedTask = {
        id: newTask.id.toString(),
        data: { label: newTask.name },
        position: { x: Math.random() * 400, y: Math.random() * 400 },
        style: {
          background: "linear-gradient(45deg, #ff416c, #ff4b2b)",
          color: "white",
          padding: "10px",
          borderRadius: "10px",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        },
      };

      setNodes((prevNodes) => [...prevNodes, formattedTask]);
      setTaskName(""); // Clear input
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // Handle node position changes
  const onNodesChange = useCallback(
    (changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  );

  // Handle adding edges
  const onConnect = useCallback(
    (connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  );

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        color: "white",
        fontFamily: "Arial, sans-serif",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "hidden",
      }}
    >
      {/* Task Input Section */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "10px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          placeholder="Enter task name..."
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            width: "200px",
            fontSize: "16px",
            outline: "none",
          }}
        />
        <button
          onClick={addTask}
          style={{
            padding: "10px 20px",
            background: "#00d4ff",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            color: "black",
            transition: "0.3s",
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          Add Task
        </button>
      </div>

      {/* Task Flow Container */}
      <div
        style={{
          width: "90vw",
          height: "70vh",
          borderRadius: "15px",
          overflow: "hidden",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
          padding: "10px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
    </div>
  );
}

export default TaskFlow;
