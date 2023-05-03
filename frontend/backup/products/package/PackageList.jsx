import React, { useContext, useState } from "react";
import PackageItem from "./PackageItem";
import { PackageContext } from "../../../context/package/PackageContext.jsx";
const PackageList = () => {
  const [openPackages, setOpenpackages] = useState(false);
  const { allProducts } = useContext(PackageContext);
  const toggleOpenpackages = () => {
    setOpenpackages((state) => !state);
  };
  console.log(allProducts);
  return (
    <>
      <div>
        <p onClick={() => toggleOpenpackages()} className="p-title">
          חבילות לחגים ולשבת
        </p>
        <div className={openPackages ? "" : "hide_class"}>
          {allProducts?.map((item, index) => (
            <PackageItem index={index} key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PackageList;
