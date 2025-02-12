import { Link } from "react-router-dom";
import "../styles/navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">TaskFlow</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/taskflow">Task Flow</Link>
      </div>
    </nav>
  );
}

export default Navbar;
