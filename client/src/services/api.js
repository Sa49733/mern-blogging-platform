import axios from "axios";

const API = axios.create({
  baseURL: "https://mern-blogging-platform-0qtd.onrender.com/api",
});

export default API;