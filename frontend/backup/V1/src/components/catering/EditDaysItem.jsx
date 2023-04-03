import React, { useEffect, useState } from "react";
import cateringService from "../../services/catering.service";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CateringContext } from "../../context/CateringContext";
import { dayList, serverUrl } from "../../utils/utils";
import productService from "../../services/product.service";
import { RemoveDayItem, AddDayItem } from "./DayItem";

const EditDaysItem = ({ item }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayArrToEdit, setDayArrToEdit] = useState();

  const socket = useContext(CateringContext);
  const { socketUpdate } = useContext(CateringContext);
  const addDay = async (day, setState) => {
    productService.addDay(item._id, day, socketUpdate, setState);
  };
  const removeDay = async (day, setState) => {
    productService.removeDay(item._id, day, socketUpdate, setState);
  };

  const filteredDays = dayList.filter((day) => !item?.days.includes(day));

  return (
    <div
      className="bg-dark text-center align-items-center justift-content-center d-flex flex-column"
      dir="rtl"
    >
      <h4 className="h6 bg-info p-2 ">לחץ על יום כדי להסיר אותו</h4>
      {item.days.map((item, index) => (
        <div className="bg-info m-1 btn p-1" key={index}>
          <RemoveDayItem item={item} index={index} removeDay={removeDay} />
        </div>
      ))}
      <h4 className="h6 bg-info p-2 ">לחץ על יום כדי להוסיף</h4>

      <div className="p-1  justify-content-center align-items-center text-center d-flex flex-column gap-2">
        {filteredDays?.map((item, index) => (
          <div className="bg-info m-1 btn p-1" key={index}>
            <AddDayItem item={item} index={index} addDay={addDay} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditDaysItem;
