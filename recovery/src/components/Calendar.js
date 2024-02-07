import React, { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState();
  const [showForm, setShowForm] = useState(true);
  function changeValue(val) {
    setDate(val);
  }
  console.log(date);
  let total = 15;
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
          <p>The selected date is - {date.toLocaleDateString("en-GB")}</p>

          <form>
            <label>Income</label>
            <input type="number" name="income" />
            <label>Cost</label>
            <input type="number" name="cost" />
            <label>Notes</label>
            <textarea type="text" name="notes" />
            <button>Submit</button>
          </form>
        </div>
      )}

      <h2>Todays total is: {total}</h2>
    </div>
  );
}
