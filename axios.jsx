import axios from "axios";

const https = axios.create({
    baseURL: "https://strapi-store-server.onrender.com/api"
});

https.interceptors.request.use(
    config => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
),
error => {
    return Promise.reject(error);
}

export default https;