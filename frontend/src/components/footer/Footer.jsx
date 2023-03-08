import "./footer.css";
const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className="bg-light  p-1 copyright">
      Copyright reserved @ {year} MiriCatering.co.il
    </div>
  );
};

export default Footer;
