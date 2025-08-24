import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: "http://localhost:5001/api",    // backend url
    withCredentials: true,    // send the cookies in every request
});