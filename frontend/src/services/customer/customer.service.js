import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/customer`;
const createCustomer = async (body) => {
  return await axios.post(`${baseUrl}/createCustomer`, body, headers);
};

const getAllCustomers = async () => {
  return await axios.get(`${baseUrl}`);
};

const customerService = { createCustomer, getAllCustomers };
export default customerService;
