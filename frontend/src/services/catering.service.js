import axios from "axios";

const createCaterings = async (object) => {
  try {
    const url = `http://localhost:3001/api/admin/catering/create`;
    return await axios.post(url, object);
  } catch (error) {
    console.log(error);
  }
};
const getAllCaterings = async (setState) => {
  try {
    const url = `http://localhost:3001/api/catering`;
    const data = await axios.get(url);
    setState(data.data);
  } catch (error) {
    console.log(error);
  }
};
const deleteAllGathers = async () => {
  try {
    const url = `http://localhost:3001/api/admin/catering/deleteAll`;
    const deleted = await axios.delete(url);
  } catch (error) {
    console.log(error);
  }
};

export { getAllCaterings, createCaterings, deleteAllGathers };

const cateringService = { getAllCaterings, createCaterings, deleteAllGathers };
export default cateringService;
