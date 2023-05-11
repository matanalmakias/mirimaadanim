import "./footer.css";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const nav = useNavigate();
  const year = new Date().getFullYear();
  return (
    <div className="bg-light text-center d-flex flex-column p-3">
      Copyright reserved @ {year} MiriCatering.co.il
    </div>
  );
};

export default Footer;
