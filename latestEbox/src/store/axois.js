/** @format */

import axios from "axios";

const users = JSON.parse(localStorage.getItem("user"));
const user = {token:users ? users.token : ''}
// const Instance = axios.create({ baseURL: config.apiUrl });
const Instance = axios.create({ baseURL: process.env.REACT_APP_API });
Instance.defaults.headers.common["Content-Type"] = "application/json";
Instance.defaults.headers.common["Accept"] = "application/json";
Instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Instance.defaults.headers.common[
	"Authorization"
] = `bearer ${user.token}`;

export const setupAxios = () => {
Instance.defaults.headers.common["Content-Type"] = "application/json";
Instance.defaults.headers.common["Accept"] = "application/json";
Instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Instance.defaults.headers.common[
	"Authorization"
] = `Bearer ${JSON.parse(localStorage.getItem("user")).token}`;
}


export default Instance;

// const Instance =  axios.create({
//         baseURL: process.env.REACT_APP_API_URL,
//         headers: { "Content-Type": "application/json" },
//         timeout: 20000
//     });
