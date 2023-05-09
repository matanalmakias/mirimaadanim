import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/product`;
const createProduct = async (body) => {
  return await axios.post(`${baseUrl}/createProduct`, body, headers);
};

const getAllProducts = async () => {
  return await axios.get(`${baseUrl}`);
};

const productService = { createProduct, getAllProducts };
export default productService;
