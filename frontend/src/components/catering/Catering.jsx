import { useState } from "react";
import { cateringList } from "../../utils/content";
import { useNavigate } from "react-router-dom";

const Catering = () => {
  const [showCateringList, setShowCateringList] = useState(false);

  const nav = useNavigate();
  return (
    <>
      <p onClick={() => nav("/catering-events")} className="card p-1 mb-1">
        הזמנה קייטרינג לאירועים
      </p>
      {showCateringList && <CateringList />}
    </>
  );
};

export const CateringList = () => {
  return (
    <>
      <div className="">
        {cateringList?.map((item) => (
          <CateringItem key={item._id} item={item} />
        ))}
      </div>
    </>
  );
};

export const CateringItem = ({ item }) => {
  const [showCateringItem, setShowCateringItem] = useState(false);
  const nav = useNavigate();

  return (
    <>
      <p onClick={() => nav(`/catering/${item._id}`)} className="m-1 card ">
        {item?.name}
      </p>
      <p className="card p1 m-1">{item?.description}</p>
    </>
  );
};

export default Catering;
