import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api",
  //baseURL: "https://scheduling1123.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default instance;
