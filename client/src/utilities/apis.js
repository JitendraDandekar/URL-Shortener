const API_HOST = import.meta.env.VITE_API_HOST || "http://localhost:5000";

export const SIGN_IN_API = API_HOST + "/api/v1/users/login"
export const SIGN_UP_API = API_HOST + "/api/v1/users/register"
export const GET_URLS_API = API_HOST + "/api/v1/urls/"
export const CREATE_URL_API = API_HOST + "/api/v1/urls/create"
export const URL_STATS_API = API_HOST + "/api/v1/urls/stats"