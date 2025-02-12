import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "../src/components/Navbar";
import HomePage from "../src/pages/Home";
import TaskFlow from "../src/pages/TaskFlowPage";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/taskflow" element={<TaskFlow />} />
      </Routes>
    </Router>
  );
}

export default App;
