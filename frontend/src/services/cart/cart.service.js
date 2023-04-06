import axios from "axios";

import { serverUrl } from "./../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/cart`;

const remove = async (productId) => {
  return await axios.delete(
    `${baseUrl}/remove/${productId}`,

    headers
  );
};
const add = async (productId, category) => {
  return await axios.put(
    `${baseUrl}/add/${productId}/${category}`,
    {},
    headers
  );
};

export { add, remove };

const cartService = { add, remove };
export default cartService;
