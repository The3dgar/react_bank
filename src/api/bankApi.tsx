import axios from "axios";

const baseURL = process.env.REACT_APP_API_URL;

const bankApi = axios.create({ baseURL });

bankApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-api-key"] = token;
  }

  return config;
});

export default bankApi;
