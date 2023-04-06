import React, { useContext } from "react";
import { useParams } from "react-router-dom";
import PackageContext from "../../../context/package/PackageContext";

const PackageDetails = () => {
  const { id } = useParams();
  const { allProducts } = useContext(PackageContext);

  const foundPackage = allProducts?.find((item) => (item._id = id));

  return (
    <div className="d-flex p-3 flex-column text-center">
      <h3 className="h3 text-white">כותרת</h3>
      <p className="salad-item"> {foundPackage.name}</p>
      <h3 className="h3 text-white">תיאור</h3>
      <p className="salad-item"> {foundPackage.description}</p>
      <h3 className="h3 text-white">מחיר</h3>
      <p className="salad-item"> {foundPackage.price}</p>
      <h3 className="h3 text-white">משקל מינימלי</h3>
      <p className="salad-item"> {foundPackage.weight}</p>
    </div>
  );
};

export default PackageDetails;
