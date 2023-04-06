import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/package`;

const getProducts = async () => {
  return await axios.get(`${baseUrl}/getAllProducts`);
};
const createProduct = async (body) => {
  return await axios.post(`${baseUrl}/create`, body, headers);
};

export { createProduct, getProducts };

const packageService = { createProduct, getProducts };
export default packageService;
