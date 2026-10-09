import axios from "axios";

export const api = axios.create({
  baseURL: "https://guesswhat-api-zj46.onrender.com",
});
