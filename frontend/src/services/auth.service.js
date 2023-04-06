import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/auth`;

const editEmail = async (emailInput) => {
  return await axios
    .post(`${baseUrl}/editEmail`, { email: emailInput }, headers)
    .then((res) => toast(res.data.message));
};
const editPassword = async (passwordInput) => {
  return await axios
    .post(`${baseUrl}/editPassword`, { password: passwordInput }, headers)
    .then((res) => toast(res.data.message));
};

const getSingleUser = async () => {
  return axios.get(`${baseUrl}/getSelfUser`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

const tryLogin = async (phoneNumber) => {
  return axios.post(`${baseUrl}/tryLogin/${phoneNumber}`);
};
const finalLogin = async (phoneNumber, verfCode) => {
  return axios
    .post(`${baseUrl}/finalLogin/${phoneNumber}/${verfCode}`)
    .then((res) => {
      const token = res.data.accessToken;
      const phone = res.data.phoneNumer;
      const roles = res.data.roles;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ phone, token, roles }));
      }
      return res.data;
    });
};
const existCodeLogin = async (phoneNumber, verfCode) => {
  return axios
    .post(`${baseUrl}/existLogin/${phoneNumber}/${verfCode}`)
    .then((res) => {
      const token = res.data.accessToken;
      const phone = res.data.phoneNumer;
      const roles = res.data.roles;
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify({ phone, token, roles }));
      }
      return res.data;
    });
};

const register = async (username, email, password) => {
  return axios.post(baseUrl + "/signup", { username, email, password });
};

const login = async (email, password) => {
  return axios.post(baseUrl + "/signin", { email, password }).then((res) => {
    const token = res.data.accessToken;
    const email = res.data.email;
    const username = res.data.username;
    const roles = res.data.roles;
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem(
        "user",
        JSON.stringify({ email, username, token, roles })
      );
    }
    return res.data;
  });
};

const logout = async () => {
  localStorage.removeItem("token");
};

export {
  register,
  login,
  logout,
  getSingleUser,
  editPassword,
  editEmail,
  tryLogin,
  finalLogin,
  existCodeLogin,
};

const authService = {
  register,
  login,
  logout,
  getSingleUser,
  editPassword,
  editEmail,
  tryLogin,
  finalLogin,
  existCodeLogin,
};
export default authService;
