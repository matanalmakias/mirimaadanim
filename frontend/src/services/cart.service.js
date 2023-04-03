import axios from "axios";
import { toast } from "react-toastify";
import { serverUrl } from "../utils/utils.js";
const url = `${serverUrl}/api`;
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};

const decQuantity = async (productId) => {
  return await axios.post(`${url}/cart/decQuantity/${productId}`, {}, headers);
};
const incQuantity = async (productId) => {
  return await axios.post(`${url}/cart/incQuantity/${productId}`, {}, headers);
};

const removeBusinessMealFromCart = async (productId) => {
  return await axios.delete(
    `${url}/cart/removeBusinessMealFromCart/${productId}`,
    headers
  );
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
  submitOrderPackage,
  removeBusinessMealFromCart,
};

const cartService = {
  decQuantity,
  incQuantity,
  checkout,
  addToCart,
  removeFromCart,
  submitOrderPackage,
  removeBusinessMealFromCart,
};
export default cartService;
