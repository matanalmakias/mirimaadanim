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
const getDayProducts = async (dayName) => {
  return await axios.get(`${url}/days/${dayName}`);
};
const deleteWorkerPermanently = async (workerId) => {
  return await axios
    .delete(`${url}/cart/deleteWorkerPermanently/${workerId}`, headers)
    .then((res) => toast(res.data.message));
};
const signWorker = async (workerId, productId) => {
  return await axios.post(
    `${url}/cart/signWorker/${workerId}/${productId}`,
    {},
    headers
  );
};

const sendWorker = async (workerInput) => {
  const body = { name: workerInput };

  return await axios.post(`${url}/cart/addWorker`, body, headers);
};
const getAllOrders = async () => {
  return await axios.get(`${url}/order`, headers);
};
const getSingleOrder = async (orderId) => {
  return await axios.get(`${url}/order/${orderId}`, headers);
};
const decQuantity = async (productId) => {
  return await axios.post(`${url}/cart/decQuantity/${productId}`, {}, headers);
};
const incQuantity = async (productId) => {
  return await axios.post(`${url}/cart/incQuantity/${productId}`, {}, headers);
};

const removeFromCart = async (productId) => {
  return await axios.delete(`${url}/cart/deleteFromCart/${productId}`, headers);
};
const addToCart = async (productId) => {
  return await axios.post(`${url}/cart/addToCart/${productId}`, {}, headers);
};

const submitOrderPackage = async () => {
  return await axios.post(`${url}/cart/createOrderPackage`, {}, headers);
};
const checkout = async () => {
  return await axios.post(`${url}/cart/createOrderPackage/`, {}, headers);
};
const getSingleProduct = async (setState, productId) => {
  return await axios
    .get(`${url}/product/${productId}`, headers)
    .then((res) => setState(res.data));
};
const getAllProducts = async (setState) => {
  return await axios.get(`${url}/product`).then((res) => setState(res.data));
};

export {
  decQuantity,
  incQuantity,
  checkout,
  addToCart,
  removeFromCart,
  getSingleOrder,
  getAllOrders,
  submitOrderPackage,
  sendWorker,
  signWorker,
  deleteWorkerPermanently,
  getDayProducts,
  getAllProducts,
  getSingleProduct,
};

const storeService = {
  decQuantity,
  incQuantity,
  checkout,
  addToCart,
  removeFromCart,
  getSingleOrder,
  getAllOrders,
  submitOrderPackage,
  sendWorker,
  signWorker,
  deleteWorkerPermanently,
  getDayProducts,
  getAllProducts,
  getSingleProduct,
};
export default storeService;
