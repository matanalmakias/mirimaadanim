import axios from "axios";
const url = `http://localhost:3001/api`;
const addToCart = async (productId) => {
  const config = {
    headers: {
      Authorization: localStorage.getItem("token"),
    },
  };
  return await axios.post(`${url}/cart/addToCart/${productId}`, config);
};
const checkout = async (cartState, setCartState) => {
  const fetch = await axios
    .post("http://localhost:3001/api/store/buy", { items: cartState })
    .then((response) => {
      console.log(response.data);
      setCartState([]);
    })
    .catch((error) => {
      console.log(error);
    });
};

export { checkout, addToCart };

const storeService = { checkout, addToCart };
export default storeService;
