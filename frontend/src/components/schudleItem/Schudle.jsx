import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import weeklyService from "../../services/weekly.service";
import { SocketContext } from "../../context/CateringContext";
function scheduleItem(startDate, startTime) {
  return new Promise((resolve, reject) => {
    const object = { date: startDate, hour: startTime };

    resolve(object);
  });
}

function ScheduleItem({ item, addWeeklyCart, toggle }) {
  const [startDate, setStartDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const socket = useContext(SocketContext);
  function handleScheduleItem() {
    scheduleItem(startDate, startTime)
      .then((object) => {
        weeklyService.addProduct(item._id, object).then((res) => {
          console.log(res.data);
          socket.emit("update");
        });
      })
      .catch((error) => {
        console.error("Error setting object:", error);
      });
  }

  return (
    <div className=" p-2 shadow">
      <p className="bg-primary text-light p-1">בחר תאריך</p>
      <DatePicker
        selected={startDate}
        onChange={(date) => setStartDate(date)}
        dateFormat="dd/MM/yyyy"
      />
      <br />
      <br />
      <p className="bg-primary text-light p-1">בחר שעה</p>
      <input
        type="time"
        value={startTime}
        onChange={(e) => setStartTime(e.target.value)}
      />
      <br />
      <br />
      <div className="d-flex flex-row gap-2 p-2">
        <p className="btn btn-success" onClick={handleScheduleItem}>
          תזמן מוצר
        </p>
        <p className="btn btn-danger" onClick={() => toggle()}>
          סגור
        </p>
      </div>
    </div>
  );
}

export default ScheduleItem;
