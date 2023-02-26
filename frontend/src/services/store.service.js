import axios from "axios";
const url = `http://localhost:3001/api`;
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

export { checkout, addToCart, removeFromCart };

const storeService = { checkout, addToCart, removeFromCart };
export default storeService;
