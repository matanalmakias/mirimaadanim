import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/salad`;

const getProducts = async () => {
  return await axios.get(`${baseUrl}/getAllProducts`);
};
const createProduct = async (body) => {
  return await axios.post(`${baseUrl}/create`, body, headers);
};

export { createProduct, getProducts };

const saladService = { createProduct, getProducts };
export default saladService;
