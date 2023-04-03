import { useEffect, useState } from "react";

export const AddDayItem = ({ item, index, addDay }) => {
  const [pickedDay, setPickedDay] = useState();

  return (
    <div
      onClick={() => addDay(item, setPickedDay)}
      className="btn p-1  rounded  text-light bg-info"
      key={index}
    >
      {item}
    </div>
  );
};
export const RemoveDayItem = ({ item, index, removeDay }) => {
  const [pickedDay, setPickedDay] = useState();

  return (
    <div
      onClick={() => removeDay(item, setPickedDay)}
      className="btn p-1  rounded  text-light bg-info"
      key={index}
    >
      {item}
    </div>
  );
};
