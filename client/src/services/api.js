import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",
});

export const toggleLike = async (id, token) => {
  return API.put(
    `/blogs/${id}/like`,
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export default API;