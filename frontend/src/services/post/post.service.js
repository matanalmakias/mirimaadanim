import axios from "axios";

import { serverUrl } from "../../utils/utils.js";
const token = localStorage.getItem("token");
const headers = {
  headers: {
    Authorization: token,
  },
};
const baseUrl = `${serverUrl}/api/post`;
const createPost = async (body) => {
  return await axios.post(`${baseUrl}/createPost`, body, headers);
};

const getAllPosts = async () => {
  return await axios.get(`${baseUrl}`);
};

const postService = { createPost, getAllPosts };
export default postService;
