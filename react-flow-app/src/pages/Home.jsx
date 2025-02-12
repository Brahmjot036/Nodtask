import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        background: "linear-gradient(to right, #0f2027, #32026d, #5b2b88)",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        padding: "20px",
      }}
    >
      {/* Animated Title */}
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
          textShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        Welcome to <span style={{ color: "#00d4ff" }}>Task Flow</span>!
      </motion.h1>

      {/* Animated Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        style={{
          fontSize: "1.3rem",
          maxWidth: "600px",
          marginTop: "10px",
          lineHeight: "1.6",
          color: "#d1e8e2",
        }}
      >
        A beautiful and interactive task management system designed to simplify
        your workflow and boost productivity.
      </motion.p>

      {/* Feature List */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
        style={{
          marginTop: "20px",
          textAlign: "left",
          background: "rgba(255, 255, 255, 0.1)",
          padding: "20px",
          borderRadius: "15px",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          width: "80%",
          maxWidth: "600px",
        }}
      >
        <h3 style={{ color: "#00d4ff", marginBottom: "10px" }}>
          🌟 Why Task Flow?
        </h3>
        <ul
          style={{
            listStyleType: "none",
            padding: 0,
            lineHeight: "1.8",
            color: "#ffffff",
          }}
        >
          <li>✔️ Effortlessly add, update, and delete tasks</li>
          <li>✔️ Drag and drop tasks with an interactive UI</li>
          <li>✔️ Beautiful, smooth animations</li>
          <li>✔️ Fully responsive and intuitive</li>
        </ul>
      </motion.div>

      {/* Animated Call-to-Action Button */}
      <motion.button
        whileHover={{
          scale: 1.1,
          background: "linear-gradient(to right, #00c6ff, #0072ff)",
          color: "white",
        }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/taskflow")}
        style={{
          marginTop: "30px",
          padding: "12px 24px",
          fontSize: "1.2rem",
          fontWeight: "bold",
          border: "none",
          borderRadius: "25px",
          cursor: "pointer",
          background: "linear-gradient(to right, #ff416c, #ff4b2b)",
          color: "white",
          boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.3)",
          transition: "0.3s ease-in-out",
        }}
      >
        Get Started 🚀
      </motion.button>
    </div>
  );
};

export default Home;
