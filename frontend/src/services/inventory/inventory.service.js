import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/inventory`;
const createInventory = async (body) => {
  return await axios.post(`${baseUrl}/createInventory`, body, headers);
};

const getAllInventorys = async () => {
  return await axios.get(`${baseUrl}`);
};

const inventoryService = { createInventory, getAllInventorys };
export default inventoryService;
