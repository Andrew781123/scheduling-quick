import axios from "axios";

const instance = axios.create({
  baseURL: "https://scheduling1123.herokuapp.com",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default instance;
