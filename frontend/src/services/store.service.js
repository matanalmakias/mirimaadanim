import axios from "axios";
const url = `http://localhost:3001/api`;

const getAllOrders = async (orderId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.get(`${url}/order`, config);
};
const getSingleOrder = async (orderId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.get(`${url}/order/${orderId}`, config);
};
const decQuantity = async (productId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${url}/cart/decQuantity/${productId}`, {}, config);
};
const incQuantity = async (productId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${url}/cart/incQuantity/${productId}`, {}, config);
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
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.delete(`${url}/cart/deleteFromCart/${productId}`, config);
};
const addToCart = async (productId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${url}/cart/addToCart/${productId}`, {}, config);
};

const submitOrderPackage = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${url}/cart/createOrderPackage`, {}, config);
};
const checkout = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.post(`${url}/cart/createOrderPackage/`, {}, config);
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
};
export default storeService;
