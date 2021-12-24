import axios from "axios";

const instance = axios.create({
  baseURL:
    process.env.REACT_APP_BACKEND_BASE_URL ||
    "https://chat-app-arvid.herokuapp.com",
});

export default instance;
