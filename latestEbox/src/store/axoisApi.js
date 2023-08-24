/** @format */

import axios from "axios";

// const Instance = axios.create({ baseURL: config.apiUrl });
const Instance = axios.create({ baseURL: process.env.REACT_APP_API_SUB_LOCAL });
Instance.defaults.headers.common["Content-Type"] = "application/json";
Instance.defaults.headers.common["Accept"] = "application/json";
Instance.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
Instance.defaults.headers.common[
	"Authorization"
] = `bearer ${localStorage.getItem("token")}`;

export default Instance;

// const Instance =  axios.create({
//         baseURL: process.env.REACT_APP_API_URL,
//         headers: { "Content-Type": "application/json" },
//         timeout: 20000
//     });
