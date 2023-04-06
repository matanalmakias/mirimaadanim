import axios from "axios";

import { serverUrl } from "./../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/shabat-food`;

const getProducts = async () => {
  return await axios.get(`${baseUrl}/getAllProducts`);
};
const createProduct = async (body) => {
  return await axios.post(`${baseUrl}/create`, body, headers);
};

export { createProduct, getProducts };

const shabatService = { createProduct, getProducts };
export default shabatService;
