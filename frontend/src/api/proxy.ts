import axios from "axios";

const instance = axios.create({
  baseURL: "ec2-54-176-129-145.us-west-1.compute.amazonaws.com/api",
  //baseURL: "https://scheduling1123.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default instance;
