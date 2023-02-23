import axios from "axios";

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

export { checkout };

const storeService = { checkout };
export default storeService;
