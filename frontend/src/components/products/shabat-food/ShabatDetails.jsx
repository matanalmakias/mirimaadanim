import React from "react";
import { useParams } from "react-router-dom";
import { shabatFood } from "./ShabatFoodList";

const ShabatDetails = () => {
  const { id } = useParams();
  const shabat = shabatFood.find((item) => (item.id = id));

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
