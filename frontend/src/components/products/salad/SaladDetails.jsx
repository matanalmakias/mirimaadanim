import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import SaladContext from "../../../context/salads/SaladContext";
import Loader1 from "./../../loader/Loader1.jsx";

const SaladDetails = () => {
  const { allProducts } = useContext(SaladContext);
  const { id } = useParams();
  if (allProducts === null) {
    return <Loader1 />;
  }
  const salad = allProducts?.find((item) => item?._id === id);

  return (
    <div className="d-flex p-3 flex-column text-center">
      <h3 className="h3 text-white">כותרת</h3>
      <p className="salad-item"> {salad.name}</p>
      <h3 className="h3 text-white">תיאור</h3>
      <p className="salad-item"> {salad.description}</p>
      <h3 className="h3 text-white">מחיר</h3>
      <p className="salad-item"> {salad.price}</p>
      <h3 className="h3 text-white">משקל מינימלי</h3>
      <p className="salad-item"> {salad.weight}</p>
    </div>
  );
};

export default SaladDetails;
