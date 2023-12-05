import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import axios from "axios";
import { useState } from "react";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";
import { movieInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import "./newMovie.scss";

const NewMovie = () => {
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [cinemaId, setCinemaId] = useState(undefined);
  const [movies, setMovies] = useState([]);

  const { data, loading, error } = useFetch("/cinemas");

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    const movieNumbers = movies.split(",").map((movie) => ({ number: movie }));
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("file", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dfbddxq5q/image/upload",
            data
          );

          const { url } = uploadRes.data;
          return url;
        })
      );

      const newcinema = {
        ...info,
        movieNumbers,
        img: list[0],
      };

      await axios.post(`/movies/${cinemaId}`, newcinema);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(info);
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Movie</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
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
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>
              {movieInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    placeholder={input.placeholder}
                    onChange={handleChange}
                  />
                </div>
              ))}
              <div className="formInput">
                <label>Seats</label>
                <textarea
                  onChange={(e) => setMovies(e.target.value)}
                  placeholder="give comma between seat numbers."
                />
              </div>
              <div className="formInput">
                <label>Choose a cinema</label>
                <select
                  id="cinemaId"
                  onChange={(e) => setCinemaId(e.target.value)}
                >
                  {loading
                    ? "loading"
                    : data &&
                      data.map((cinema) => (
                        <option key={cinema._id} value={cinema._id}>
                          {cinema.name}
                        </option>
                      ))}
                </select>
              </div>
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewMovie;
