import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./navbar.css";
const Navbar = () => {
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
  };
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {}
  };
  const handleRegister = () => {
    navigate("/register");
  };
  return (
    <div className="navbar">
      <div className="navContainer ms-2">
        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
          <span className="logo">MovieBooking</span>
        </Link>
        {user ? (
          <div>
            
            <div className="cellWithImg">
              <img
                className="cellImg"
                src={user.img || "https://i.ibb.co/MBtjqXQ/no-avatar.gif"}
                alt="avatar"
              />
              {user.username}
            </div>
            <button className="headerBtn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        ) : (
          <div className="navItems">
            <button className="navButton" onClick={handleRegister}>
              Register
            </button>
            <button className="navButton" onClick={handleClick}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
