import { useNavigate } from "react-router-dom";
import "./daily.css";
import { getDay, days } from "../../functions/getDay";
import Days from "./days/Days";
const Daily = () => {
  const nav = useNavigate();
  const day = getDay();

  return <Days day={day} />;
};

export default Daily;
