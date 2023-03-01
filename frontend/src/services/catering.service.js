import axios from "axios";
const url = `http://localhost:3001/api`;
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
  const url = `http://localhost:3001/api/category`;
  return await axios.get(url).then((res) => {
    setState(res.data);
    localStorage.setItem("categories", JSON.stringify(res.data));
  });
};
const createProducts = async (setState, product) => {
  return await axios
    .post("http://localhost:3001/api/manager/product/createProduct", product, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => setState(res.data));
};
const getAllProducts = async (setState) => {
  return await axios.get(`http://localhost:3001/api/product`).then((res) => {
    setState(res.data.product);
    localStorage.setItem("caterings", JSON.stringify(res.data.product));
  });
};
const deleteAllProducts = async () => {
  try {
    const url = `http://localhost:3001/api/manager/product/deleteAll`;
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
};
export default cateringService;
