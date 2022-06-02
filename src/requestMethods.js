import axios from "axios";

const BASE_URL = "http://localhost:8080/api"
// const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMTFjMzIwOGI5ZjkyNjljMDkxMGYzNyIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY1MTU1NjkwMSwiZXhwIjoxNjUxODE2MTAxfQ.R3A_Ut1GnBYaQ-ODPM7PPe2i9PdwbPDvDFqkUdNYytU"

export const publicRequest = axios.create({
    baseURL: BASE_URL
})
const LOCAL1 = JSON.parse(localStorage.getItem("persist:root"))

const LOCAL2 = LOCAL1 == null ? null : JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser

const TOKEN = LOCAL2 === null ? "" : LOCAL2.accessToken

export const userRequest = axios.create({
            baseURL: BASE_URL,
            headers:{token: `Bearer ${TOKEN}`}
            // headers: { token: 'Bearer ' + getToken() }
            })

