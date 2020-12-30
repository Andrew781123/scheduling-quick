import axios from "axios";

const instance = axios.create({
  baseURL: "http://ec2-3-101-35-80.us-west-1.compute.amazonaws.com/api",
  //baseURL: "https://scheduling1123.herokuapp.com/api",
  headers: {
    "Content-type": "application/json"
  },
  withCredentials: true
});

export default instance;
