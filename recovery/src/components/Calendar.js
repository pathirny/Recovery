import React, { useState } from "react";
import Calendar from "react-calendar";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState();
  const [showForm, setShowForm] = useState(true);
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
          <p>The selected date is - {date.toLocaleDateString()}</p>

          <form>
            <label>Cost</label>
            <input type="number" name="cost" />
            <label>Income</label>
            <input type="number" name="income" />
            <label>Notes</label>
            <textarea type="text" name="notes" />
            <button>Submit</button>
          </form>
        </div>
      )}
    </div>
  );
}
