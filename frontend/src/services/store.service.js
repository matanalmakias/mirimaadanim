import axios from "axios";
import { toast } from "react-toastify";
const url = `http://localhost:3001/api`;
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
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
const getCart = async (setState) => {
  return await axios
    .get(`http://localhost:3001/api/cart`, {
      headers: { Authorization: localStorage.getItem("token") },
    })
    .then((res) => {
      setState(res.data);

      localStorage.setItem("cart", JSON.stringify(res.data));
    });
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

export {
  decQuantity,
  incQuantity,
  checkout,
  addToCart,
  removeFromCart,
  getCart,
  getSingleOrder,
  getAllOrders,
  submitOrderPackage,
  sendWorker,
  signWorker,
  deleteWorkerPermanently,
};

const storeService = {
  decQuantity,
  incQuantity,
  checkout,
  addToCart,
  removeFromCart,
  getCart,
  getSingleOrder,
  getAllOrders,
  submitOrderPackage,
  sendWorker,
  signWorker,
  deleteWorkerPermanently,
};
export default storeService;
