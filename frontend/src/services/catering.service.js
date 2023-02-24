import axios from "axios";

const getAllCategories = async (setState) => {
  try {
    const url = `http://localhost:3001/api/category`;
    const categories = await axios
      .get(url)
      .then((res) => {
        setState(res);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
const createProducts = async (object) => {
  try {
    const url = `http://localhost:3001/api/manager/product/createProduct`;
    return await axios.post(url, object);
  } catch (error) {
    console.log(error);
  }
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
    const deleted = await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
};

export { getAllCategories, deleteAllProducts, createProducts, getAllProducts };

const cateringService = {
  getAllCategories,
  deleteAllProducts,
  createProducts,
  getAllProducts,
};
export default cateringService;
