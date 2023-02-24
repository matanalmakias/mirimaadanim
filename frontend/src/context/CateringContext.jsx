import { createContext, useEffect, useState } from "react";

import cateringService from "../services/catering.service";

//create the context:
const CateringContext = createContext({
  caterings: [],
  categories: [],
  setCaterings: () => {},
  setCategories: () => {},
});

const CateringProvider = ({ children }) => {
  const [caterings, setCaterings] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    cateringService.getAllProducts(setCaterings);
    cateringService.getAllCategories(setCategories);
  }, []);

  useEffect(() => {}, [categories, caterings]);

  return (
    <>
      <CateringContext.Provider
        value={{ categories, setCategories, caterings, setCaterings }}
      >
        {children}
      </CateringContext.Provider>
    </>
  );
};

export { CateringContext, CateringProvider };
