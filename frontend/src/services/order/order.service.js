import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/order`;
const createOrder = async (body) => {
  return await axios.post(`${baseUrl}/createOrder`, body, headers);
};

const getAllOrders = async () => {
  return await axios.get(`${baseUrl}`);
};

const orderService = { createOrder, getAllOrders };
export default orderService;
