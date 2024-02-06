import React, { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState();


  function changeValue(val) {
    setDate(val);
  }
  
  return (
    <div>
      <Calendar
        onChange={changeValue}
        value={date}
        defaultView="month"
        onClickDay={(day) => console.log(day)}
      />
      <p>The selected date is - {date.toLocaleDateString()}</p>
    </div>
  );
}
