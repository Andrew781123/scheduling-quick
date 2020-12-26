import axios from "axios";

const instance = axios.create({
  //baseURL: process.env.REACT_APP_SERVER_URL,
  headers: {
    "Content-type": "application/json"
  }
});

export default instance;
