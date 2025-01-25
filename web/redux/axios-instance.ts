import axios from "axios";
const baseURL = process.env.NEXT_PUBLIC_BASEURL;
console.log(baseURL);

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

axiosInstance.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers["Accept"] = "application/json";
axios.defaults.timeout = 60000;

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (error) {
    console.log(error);
  }
);
export default axiosInstance;
