import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../utils/utils";
const url = `${serverUrl}/api`;
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const removeDay = async (productId, day, socketUpdate, setState) => {
  return await axios
    .post(
      `${serverUrl}/api/product/removeDay/${productId}`,
      { day },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      socketUpdate();
      setState(res.data);
      toast(res.data.message);
    });
};
const addDay = async (productId, day, socketUpdate, setState) => {
  return await axios
    .post(
      `${serverUrl}/api/product/addDay/${productId}`,
      { day },
      {
        headers: { Authorization: localStorage.getItem("token") },
      }
    )
    .then((res) => {
      socketUpdate();
      setState(res.data);
      toast(res.data.message);
    });
};

export { addDay, removeDay };

const productService = { addDay, removeDay };
export default productService;
