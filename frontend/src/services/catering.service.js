import axios from "axios";
import { serverUrl } from "../utils/utils.js";
const url = `${serverUrl}/api`;
const config = {
  headers: {
    Authorization: localStorage.getItem("token"),
  },
};

const removeProductFromDays = async (productId, daysArray) => {
  return await axios.put(
    `${url}/days/removeProduct/${productId}`,
    daysArray,
    config
  );
};
const addProductToDays = async (productId, daysArray) => {
  return await axios.put(
    `${url}/days/addProduct/${productId}`,
    { days: daysArray },
    config
  );
};

const getSingleProduct = async (productId) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  return await axios.get(`${url}/product/${productId}`, config);
};
const isProductInCart = async (productId, setState) => {
  return await axios
    .get(`${url}/is/isProductInCart/${productId}`)
    .then((res) => {
      setState(res.data);
    });
};

const editProduct = async (productId, productData) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: localStorage.getItem("token"),
    },
  };
  return axios.post(
    `${url}/manager/product/editProduct/${productId}`,
    productData,
    config
  );
};

const removeProduct = async (productId) => {
  return await axios.delete(
    `${url}/manager/product/deleteProduct/${productId}`,
    {
      headers: { Authorization: localStorage.getItem("token") },
    }
  );
};

const getAllCategories = async (setState) => {
  const url = `${serverUrl}/api/category`;
  return await axios.get(url).then((res) => {
    setState(res.data);
    localStorage.setItem("categories", JSON.stringify(res.data));
  });
};
const createProducts = async (setState, product) => {
  let result;
  await axios
    .post(`${serverUrl}/api/manager/product/createProduct`, product, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => {
      setState(res.data);
      result = res.data;
    });
  return result;
};
const getAllProducts = async (setState) => {
  return await axios.get(`${serverUrl}/api/product`).then((res) => {
    setState(res.data.product);
    localStorage.setItem("caterings", JSON.stringify(res.data.product));
  });
};
const deleteAllProducts = async () => {
  try {
    const url = `${serverUrl}/api/manager/product/deleteAll`;
    return await axios.delete(url, {
      headers: { Authorization: localStorage.getItem("token") },
    });
  } catch (error) {
    console.log(error);
  }
};

export {
  removeProduct,
  getAllCategories,
  deleteAllProducts,
  createProducts,
  getAllProducts,
  editProduct,
  isProductInCart,
  getSingleProduct,
  addProductToDays,
  removeProductFromDays,
};

const cateringService = {
  removeProduct,
  getAllCategories,
  deleteAllProducts,
  createProducts,
  getAllProducts,
  editProduct,
  isProductInCart,
  getSingleProduct,
  addProductToDays,
  removeProductFromDays,
};
export default cateringService;
