import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { createClient } from "@supabase/supabase-js";

export default function CalendarView() {
  const [date, setDate] = useState(new Date());
  const [event, setEvent] = useState();
  const [showForm, setShowForm] = useState(true);
  const [calendarData, setCalendarData] = useState();
  const [costs, setCosts] = useState();
  const [income, setIncome] = useState();
  const [total, setTotal] = useState();
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );
  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase.from("Calendar").select("*");
      let response = data;
      setCosts(response[0].costs);
      setIncome(response[0].income);
    }
    getData();
  }, []);

  useEffect(() => {
    if (income !== undefined && costs !== undefined) {
      let amount = parseInt(income) - parseInt(costs);
      setTotal(amount);
    }
  }, [income, costs]);

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
