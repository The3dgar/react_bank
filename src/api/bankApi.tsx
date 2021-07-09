import axios from "axios";

const baseURL = "http://192.168.100.4:4000/api";
const bankApi = axios.create({ baseURL });

bankApi.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["x-api-key"] = token;
  }

  return config;
});

export default bankApi;
