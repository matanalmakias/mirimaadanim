import { createContext, useEffect, useState } from "react";

import cateringService from "../services/catering.service";

//create the context:
const CateringContext = createContext({
  caterings: [],
  setCaterings: () => {},
});

const CateringProvider = ({ children }) => {
  const [caterings, setCaterings] = useState();
  useEffect(() => {
    cateringService.getAllCaterings(setCaterings);
  }, []);

  useEffect(() => {}, [caterings]);

  return (
    <>
      <CateringContext.Provider value={{ caterings, setCaterings }}>
        {children}
      </CateringContext.Provider>
    </>
  );
};

export { CateringContext, CateringProvider };
