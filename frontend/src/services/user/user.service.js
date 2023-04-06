import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/auth`;

const updateAddress = async (body) => {
  return await axios.post(`${baseUrl}/updateAddress`, body, headers);
};

export { updateAddress };

const userService = { updateAddress };
export default userService;
