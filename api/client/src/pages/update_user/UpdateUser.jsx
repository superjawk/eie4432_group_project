import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined.js";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.js";
import { userInputs } from "../../formSource.js";
import "./updateUser.scss";
import { axiosInstance } from "../../config.js";
const UpdateUser = () => {
  const { user, dispatch } = useContext(AuthContext);
  const items = [JSON.parse(localStorage.getItem("user"))];
  console.log("items3", items);
  const [file, setFile] = useState("");
  const [info, setInfo] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const handleLogout = async (e) => {
    try {
      e.preventDefault();
      console.log("logout");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (error) {}
  };
  const handleClick = async (e) => {
    e.preventDefault();
    const data = new FormData();
    file
      ? data.append("file", file)
      : data.append("file", "https://i.ibb.co/MBtjqXQ/no-avatar.gif");
    data.append("upload_preset", "upload");
    try {
      const uploadRes = await axios.post(
        "https://api.cloudinary.com/v1_1/dfbddxq5q/image/upload",
        data
      );
      console.log(uploadRes.data);
      const { url } = uploadRes.data;

      const newUser = {
        ...info,
        img: url,
      };

      await axiosInstance.post("/auth/updateUser", newUser);

      console.log(url);
      e.preventDefault();
      console.log("logout");
      dispatch({ type: "LOGOUT" });
      navigate("/");
    } catch (err) {
      alert(err.response.data.message);
      console.log(err.response.data);
    }
  };
  const handleCancel = () => {
    navigate("/account");
  };
  console.log("info", info);

  return (
    <div className="newContainer">
      <div className="top">
        <h1>Update account</h1>
      </div>
      <div className="bottom">
        <div className="left">
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
            }
            alt=""
          />
        </div>
        <div className="right">
          <form>
            <div className="formInput">
              <label htmlFor="file">
                Image: <DriveFolderUploadOutlinedIcon className="icon" />
              </label>
              <input
                type="file"
                id="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ display: "none" }}
              />
            </div>

            {userInputs.map((input) => (
              <div className="formInput" key={input.id}>
                <label>{input.label}</label>
                <input
                  onChange={handleChange}
                  type={input.type}
                  /*placeholder={input.placeholder}*/
                  id={input.id}
                />
              </div>
            ))}
            <div>
              <button className="btn btn-primary m-3" onClick={handleClick}>
                Send
              </button>

              <button className="btn btn-danger m-3" onClick={handleCancel}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
/*
const Register = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
    email: undefined,
  });

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      const res = await axios.post("/auth/login", credentials);
      if (res.data.isAdmin) {
        dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });

        navigate("/");
      } else {
        dispatch({
          type: "LOGIN_FAILURE",
          payload: { message: "You are not allowed!" },
        });
      }
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="Register">
      <div className="lContainer">
        <label>username</label>
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <label>email</label>
        <input
          type="email"
          placeholder="email"
          id="email"
          onChange={handleChange}
          className="lInput"
        />
        <label>pasword</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <label>confirm pasword</label>
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          SignUP
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};
*/
export default UpdateUser;
