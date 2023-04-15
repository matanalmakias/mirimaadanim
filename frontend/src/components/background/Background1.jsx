import { GiPizzaSlice, GiIcePop, GiHamburger } from "react-icons/gi";
import "./style.scss";

const BackgroundWithFoodIcons = () => {
  return (
    <div className="background">
      {[...Array(20)].map((_, i) => (
        <>
          <GiPizzaSlice className="food-icon" key={`pizza-${i}`} />
          <GiIcePop className="food-icon" key={`ice-pop-${i}`} />
          <GiHamburger className="food-icon" key={`hamburger-${i}`} />
        </>
      ))}
    </div>
  );
};

export default BackgroundWithFoodIcons;
