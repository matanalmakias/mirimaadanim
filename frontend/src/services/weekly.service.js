import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../utils/utils.js";
const url = `${serverUrl}/api`;
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const addProduct = async (productId, body) => {
  return await axios.post(
    `${url}/weekly/addProduct/${productId}`,
    body,
    headers
  );
};
export { addProduct };

const weeklyService = {
  addProduct,
};
export default weeklyService;
