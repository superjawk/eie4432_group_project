import CreditCardIcon from "@mui/icons-material/CreditCard";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import { useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DarkModeContext } from "../../context/darkModeContext";
import "./sidebar.scss";

const Sidebar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const { user, dispatchAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  // const { dispatch } = useContext(DarkModeContext);
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      dispatchAuth({ type: "LOGOUT" });
      console.log("logout");
      if (!user) {
        return <Navigate to="/login" />;
      }
    } catch (error) {}
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">Admin</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <DashboardIcon className="icon" />
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Users</span>
            </li>
          </Link>
          <Link to="/cinemas" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Cinemas</span>
            </li>
          </Link>
          <Link to="/movies" style={{ textDecoration: "none" }}>
            <li>
              <CreditCardIcon className="icon" />
              <span>Movies</span>
            </li>
          </Link>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
