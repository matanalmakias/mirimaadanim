import "./footer.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const nav = useNavigate();
  const year = new Date().getFullYear();
  return (
    <div className="bg-light text-center d-flex flex-column p-3">
      <p className="bg-info btn shadow text-light p-1" onClick={() => nav(-1)}>
        חזור
      </p>
      Copyright reserved @ {year} MiriCatering.co.il
    </div>
  );
};

export default Footer;
