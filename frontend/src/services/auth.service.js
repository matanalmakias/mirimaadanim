import axios from "axios";

const baseUrl = "http://localhost:3001/api/auth";

const getSingleUser = async () => {
  return axios.get(`${baseUrl}/getSelfUser`, {
    headers: { Authorization: localStorage.getItem("token") },
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

export { register, login, logout, getSingleUser };

const authService = { register, login, logout, getSingleUser };
export default authService;
