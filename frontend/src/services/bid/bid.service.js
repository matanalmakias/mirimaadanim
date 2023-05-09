import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/bid`;
const createBid = async (body) => {
  return await axios.post(`${baseUrl}/createBid`, body, headers);
};

const getAllBids = async () => {
  return await axios.get(`${baseUrl}`);
};

const bidService = { createBid, getAllBids };
export default bidService;
