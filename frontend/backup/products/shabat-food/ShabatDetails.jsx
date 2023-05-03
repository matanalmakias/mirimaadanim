import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import ShabatFoodContext from "../../../context/shabat-food/ShabatFoodContext";
import Loader1 from "./../../loader/Loader1.jsx";

const ShabatDetails = () => {
  const { allProducts } = useContext(ShabatFoodContext);
  const { id } = useParams();
  if (allProducts === null) {
    return <Loader1 />;
  }
  const shabat = allProducts.find((item) => item._id === id);

  return (
    <div className="d-flex p-3 flex-column text-center">
      <h3 className="h3 text-white">כותרת</h3>
      <p className="salad-item"> {shabat.name}</p>
      <h3 className="h3 text-white">תיאור</h3>
      <p className="salad-item"> {shabat.description}</p>
      <h3 className="h3 text-white">מחיר</h3>
      <p className="salad-item"> {shabat.price}</p>
      <h3 className="h3 text-white">משקל מינימלי</h3>
      <p className="salad-item"> {shabat.weight}</p>
    </div>
  );
};

export default ShabatDetails;
