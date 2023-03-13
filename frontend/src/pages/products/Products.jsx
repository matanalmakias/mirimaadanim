import { useNavigate } from "react-router-dom";
import "./daily.css";
import { getDay, days } from "../../functions/getDay";
import List from "./products/List";
import { dayList } from "../../utils/utils";

const Products = () => {
  const nav = useNavigate();
  const day = getDay();

  return (
    <div className="bg-info p-3 text-center gap-1 align-items-center justify-content-center d-flex flex-row">
      {dayList.map((item, index) => (
        <div key={index}>
          <p className="btn text-light p-1 bg-primary">{item}</p>
        </div>
      ))}
    </div>
  );
};

export default Products;
