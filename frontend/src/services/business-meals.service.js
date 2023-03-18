import axios from "axios";
import { serverUrl } from "../utils/utils";

const url = `${serverUrl}/api`;
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};

const createBusinessMeal = async (body) => {
  return await axios.post(
    `${url}/businessMeal/createBusinessMeal`,
    body,
    headers
  );
};

const getAllBusinessMeals = async () => {
  return await axios.get(`${url}/businessMeal`);
};

export { createBusinessMeal, getAllBusinessMeals };

const businessMealService = {
  createBusinessMeal,
  getAllBusinessMeals,
};
export default businessMealService;
