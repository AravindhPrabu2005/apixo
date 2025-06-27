import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://apixo-kn37.onrender.com/",
});


export default axiosInstance;
