import axios from "axios";
export const axiosInstance = axios.create({
  baseURL: "https://eie4432-group-project-server.vercel.app/api/",
});
