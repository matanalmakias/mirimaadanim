import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/catering`;
const getCateringProcess = async (body) => {
  return await axios.put(`${baseUrl}/getProcessedCatering`, body);
};

const cateringService = { getCateringProcess };
export default cateringService;
