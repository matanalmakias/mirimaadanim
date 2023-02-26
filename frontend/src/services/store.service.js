import axios from "axios";
const url = `http://localhost:3001/api`;

const getCart = async () => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios
    .get(
      `${url}/cart`,

      config
    )
    .then((res) => {
      localStorage.setItem("caterings", JSON.stringify(res.data));
    });
};
const removeFromCart = async (productId) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: token,
    },
  };
  return await axios.delete(
    `${url}/cart/deleteFromCart/${productId}`,

    config
  );
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

const checkout = async (cartState, setCartState) => {
  const fetch = await axios
    .post("http://localhost:3001/api/store/buy", { items: cartState })
    .then((response) => {
      setCartState([]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { checkout, addToCart, removeFromCart, getCart };

const storeService = { checkout, addToCart, removeFromCart, getCart };
export default storeService;
