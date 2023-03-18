import React, { useEffect, useState } from "react";
import businessMealService from "../../services/business-meals.service";

const BusinessMeals = () => {
  const [businessMeals, setBusinessMeals] = useState(null);

  useEffect(() => {
    businessMealService
      .getAllBusinessMeals()
      .then((res) => setBusinessMeals(res.data));
  }, []);
  if (businessMeals === null) {
    return;
  }

  return (
    <>
      {businessMeals?.map((item, index) => (
        <div className="d-flex flex-column ">
          <p className="mb-1 bg-white btn p-1">{index + 1}</p>
          <p className="w-100 bg-primary mb-1 text-white">{item.title}</p>
          <p className="w-100 bg-info mb-1">{item.description}</p>
          <p className="w-100 bg-info mb-1">{item.price}</p>
        </div>
      ))}
    </>
  );
};

export default BusinessMeals;
