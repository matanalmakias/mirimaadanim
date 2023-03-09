import React, { useEffect, useState } from "react";
import cateringService from "../../services/catering.service";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CateringContext } from "../../context/CateringContext";

const EditDaysItem = ({ item }) => {
  const [selectedDays, setSelectedDays] = useState([]);
  const [dayArrToEdit, setDayArrToEdit] = useState();
  const socket = useContext(CateringContext);
  useEffect(() => {
    console.log(`dayArrToEdit`, dayArrToEdit);
  }, [dayArrToEdit]);
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

  let daysList = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
  ];

  const filteredDays = daysList.filter((day) => !item.days.includes(day));
  return (
    <div className="bg-dark text-center" dir="rtl">
      <h6 className="h6 my_title1">המוצר מתוזמן לימים: </h6>
      <p>לחץ על יום כדי להסיר אותו</p>
      <form onSubmit={(e) => handleFormSubmit(e, item.id)}>
        <div className="d-flex flex-column align-items-center gap-2">
          <div className="d-flex flex-row gap-2">
            {item?.days.map((day, index) => (
              <p
                onClick={async () => {
                  // Call the setter function to update the state
                  await removeDayFromProduct(item.id, [day]);
                }}
                className="my_p"
                key={index}
              >
                {day}
              </p>
            ))}
          </div>
          <div
            dir="rtl"
            className="justify-content-center 
            align-items-center  text-center d-flex flex-row gap-2 my_row"
          >
            {filteredDays.map((item, index) => (
              <div key={index}>
                <label>
                  <input
                    type="checkbox"
                    name={item}
                    value={item}
                    onChange={handleCheckboxChange}
                    checked={selectedDays.includes(item)}
                  />
                  {item}
                </label>
              </div>
            ))}
          </div>
          <button className="my_btn1" type="submit">
            שנה ימים
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditDaysItem;
