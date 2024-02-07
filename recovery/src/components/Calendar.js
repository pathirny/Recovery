import React, { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState();
  const [showForm, setShowForm] = useState();
  function changeValue(val) {
    setDate(val);
  }

  return (
    <div>
      <Calendar
        onChange={changeValue}
        value={date}
        defaultView="month"
        onClickDay={(day) => {
          if (day) {
            setShowForm(true);
          } else {
            setShowForm(false);
          }
        }}
      />
      {showForm && (
        <div className="form">
          <form>
            <label>Cost</label>
            <input type="text" name="cost" />
            <label>Income</label>
            <input type="text" name="cost" />
            <label>Cost</label>
            <input type="text" name="cost" />
          </form>
        </div>
      )}
      <p>The selected date is - {date.toLocaleDateString()}</p>
    </div>
  );
}
