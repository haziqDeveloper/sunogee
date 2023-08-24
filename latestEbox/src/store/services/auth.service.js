/** @format */

import axios from "axios";
import toast from "react-hot-toast";
import { loginApi } from "../api";
import Instance from "../axois";
import { setupAxios } from '../axois'

const API_URL = process.env.REACT_APP_API;

const register = (username, email, password) => {
	return axios.post(API_URL + "/register", {
		username,
		email,
		password,
	});
};

const postLoginAuth = async (data) => {
  try {
        const response = await Instance.post(API_URL + loginApi , data);
        return response.data;
    } catch (error) {
        throw error;
    }
};

const logout = () => {
	localStorage.setItem("user",'');
};

const authService = {
	register,
	postLoginAuth,
	logout,
};

export default authService;
