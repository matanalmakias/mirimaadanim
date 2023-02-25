import axios from "axios";
const url = `http://localhost:3001/api`;
const removeProduct = async (productId) => {
  return axios.delete(`${url}/manager/product/deleteProduct/${productId}`, {
    headers: { Authorization: localStorage.getItem("token") },
  });
};

const getAllCategories = async (setState) => {
  const url = `http://localhost:3001/api/category`;
  return axios.get(url).then((res) => setState(res.data));
};
const createProducts = async (setState, product) => {
  return axios
    .post("http://localhost:3001/api/manager/product/createProduct", product, {
      headers: {
        Authorization: localStorage.getItem("token"),
        "Content-Type": "multipart/form-data",
      },
    })
    .then((res) => setState(res.data));
};
const getAllProducts = async (setState) => {
  try {
    axios
      .get(`http://localhost:3001/api/product`)
      .then((res) => setState(res.data));
  } catch (error) {
    console.log(error);
  }
};
const deleteAllProducts = async () => {
  try {
    const url = `http://localhost:3001/api/manager/product/deleteAll`;
    await axios.delete(url, {
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
};

const cateringService = {
  removeProduct,
  getAllCategories,
  deleteAllProducts,
  createProducts,
  getAllProducts,
};
export default cateringService;
