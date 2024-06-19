import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // 쿠키를 포함한 요청 허용
  headers: {
    "Content-Type": "application/json",
  },
});

export default instance;
