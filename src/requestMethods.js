import axios from "axios";

const BASE_URL = "http://localhost:8080/api"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
const LOCAL = localStorage.getItem("persist:root") ? JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser : null

const TOKEN = LOCAL === null ? "" : LOCAL.accessToken

export const userRequest = axios.create({
            baseURL: BASE_URL,
            headers:{token: `Bearer ${TOKEN}`}
            })

