import { createContext, useEffect, useState } from "react";
import cateringService from "../services/catering.service";
import axios from "axios";

//create the context:
const CateringContext = createContext({
  caterings: [],
  setCaterings: () => {},
});

const CateringProvider = ({ children }) => {
  const [caterings, setCaterings] = useState();
  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/catering`)
      .then((res) => console.log(res.data));
  }, []);

  useEffect(() => {}, [caterings]);
  console.log(caterings);
  return (
    <>
      <CateringContext.Provider value={{ caterings, setCaterings }}>
        {children}
      </CateringContext.Provider>
    </>
  );
};

export { CateringContext, CateringProvider };
