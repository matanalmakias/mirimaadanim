import React, { useEffect } from "react";
import { createContext } from "react";
import packageService from "../../services/package/package.service";
import { useState } from "react";
export const PackageContext = createContext({ allProducts: [] });
export const PackageProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);

  useEffect(() => {
    packageService.getProducts().then((res) => setAllProducts(res.data));
  }, []);

  return (
    <PackageContext.Provider value={{ allProducts }}>
      {children}
    </PackageContext.Provider>
  );
};

export default PackageContext;
