import React, { useState } from "react";
import PackageItem from "./PackageItem";

export const packages = [
  {
    id: 1,
    totalPrice: 233,
    items: [
      {
        id: 1,
        name: "סלט ירקות",
        description: `עגבנייה,מלפפון,בצל,גמבה`,
        weight: `250 ג'`,
        price: 12,
      },
      {
        id: 2,
        name: "סלט ירקות",
        description: `עגבנייה,מלפפון,בצל,גמבה`,
        weight: `250 ג'`,
        price: 12,
      },
      {
        id: 3,
        name: "סלט ירקות",
        description: `עגבנייה,מלפפון,בצל,גמבה`,
        weight: `250 ג'`,
        price: 12,
      },
    ],
  },

  {
    id: 2,
    totalPrice: 233,
    items: [
      {
        id: 1,
        name: "סלט ירקות",
        description: `עגבנייה,מלפפון,בצל,גמבה`,
        weight: `250 ג'`,
        price: 12,
      },
      {
        id: 2,
        name: "סלט ירקות",
        description: `עגבנייה,מלפפון,בצל,גמבה`,
        weight: `250 ג'`,
        price: 12,
      },
      {
        id: 3,
        name: "סלט ירקות",
        description: `עגבנייה,מלפפון,בצל,גמבה`,
        weight: `250 ג'`,
        price: 12,
      },
    ],
  },
];
const PackageList = () => {
  const [openPackages, setOpenpackages] = useState(false);

  const toggleOpenpackages = () => {
    setOpenpackages((state) => !state);
  };
  return (
    <>
      <div>
        <p onClick={() => toggleOpenpackages()} className="p-title">
          חבילות לחגים ולשבת
        </p>
        <div className={openPackages ? "" : "hide_class"}>
          {packages.map((item, index) => (
            <PackageItem index={index} key={item.id} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PackageList;
