import React, { useEffect, useState } from "react";
import cateringService from "../../services/catering.service";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CateringContext } from "../../context/CateringContext";
import { dayList, serverUrl } from "../../utils/utils";
import axios from "axios";

const EditDaysItem = ({ item }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayArrToEdit, setDayArrToEdit] = useState();
  const socket = useContext(CateringContext);
  const editDay = async (index) => {
    await axios
      .post(
        `${serverUrl}/api/product/editDays/${item._id}`,
        { index },
        {
          headers: { Authorization: localStorage.getItem("token") },
        }
      )
      .then((res) => toast(res.data.message));
  };
  function handleCheckboxChange(event) {
    const { value } = event.target;
    if (selectedDays.includes(value)) {
      setSelectedDays(selectedDays.filter((day) => day !== value));
    } else {
      setSelectedDays([...selectedDays, value]);
    }
  }

  async function removeDayFromProduct(productId, daysArray) {
    cateringService
      .removeProductFromDays(productId, daysArray)
      .then((res) => toast(res.data.message));
  }
  async function handleFormSubmit(event, productId) {
    event.preventDefault();
    cateringService.addProductToDays(productId, selectedDays).then((res) => {
      toast(res.data.message);
      socket.emit("update");
    });
  }
  const filteredDays = dayList.filter((day) => !item.days.includes(day));
  return (
    <div
      className="bg-dark text-center align-items-center justift-content-center d-flex flex-column"
      dir="rtl"
    >
      <h4 className="h6 bg-info p-2 ">המוצר מתוזמן לימים: </h4>
      <p className="bg-light text-primary w-50">לחץ על יום כדי להסיר אותו</p>
      <div className="gap-1 p-1  justify-content-center align-items-center text-center d-flex flex-row">
        {dayList?.map((item, index) => (
          <div
            onClick={() => editDay(index)}
            className="btn p-1 fs-6   rounded  text-light bg-info"
            key={index}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EditDaysItem;
