import { useState } from "react";
import { useParams } from "react-router-dom";
import { cateringList, productList } from "../../utils/content";
import Meal from "./Meal";
import "./style.scss";
export const MenuDetails = () => {
  const { id, index } = useParams();
  const catering = cateringList?.find((item) => item._id == id);
  const menu = catering?.menus?.find((item, itemIndex) => index == itemIndex);
  const content = menu.menu.productList;

  return (
    <div className="">
      <div className="row p-1">
        <p className="bg-info text-black  card mb-1">מנה ראשונה - לחץ להסרה</p>
        {content?.firstMeals?.map((item, index) => (
          <Meal sign={`firstMeal`} item={item} key={index} />
        ))}

        <p className="bg-info text-black  card mb-1">מנה שנייה - לחץ להסרה</p>
        {content?.secondMeals?.map((item, index) => (
          <Meal sign={`secondMeal`} item={item} key={index} />
        ))}
        <p className="bg-info text-black  card mb-1">תוספות</p>
        {content?.additionals?.map((item, index) => (
          <Meal sign={`additional`} item={item} key={index} />
        ))}
        <p className="bg-info text-black  card mb-1">סלטים</p>
        {content?.salads?.map((item, index) => (
          <Meal sign={`salad`} item={item} key={index} />
        ))}
        <p className="bg-info text-black  card mb-1">חד פעמי - צבעים</p>

        <div className="col m-2">
          <p className="card mb-1">צבעי צלחות</p>
          <div className="row gap-1">
            {content?.oneTimeColors?.plates?.map((item, index) => (
              <p className="col card" key={index}>
                {item}
              </p>
            ))}
          </div>
          <p className="card mb-1">צבעי מפות</p>
          <div className="row gap-1">
            {content?.oneTimeColors?.maps?.map((item, index) => (
              <p className="col card" key={index}>
                {item}
              </p>
            ))}
          </div>
          <p className="card mb-1">צבעי סכו"ם</p>
          <div className="row gap-1">
            {content?.oneTimeColors?.forkKnife?.map((item, index) => (
              <p className="col card" key={index}>
                {item}
              </p>
            ))}
          </div>
        </div>
        <p className="bg-info text-black  card mb-1">שתייה קלה</p>
        {content.softDrinks?.map((item, index) => (
          <Meal sign={`softDrink`} key={index} item={item} />
        ))}
        <p className="bg-info text-black  card mb-1">כללי</p>
        {content.generals?.map((item, index) => (
          <Meal sign={`general`} key={index} item={item} />
        ))}
      </div>
    </div>
  );
};
export default MenuDetails;
