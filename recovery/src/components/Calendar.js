import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { createClient } from "@supabase/supabase-js";

export default function CalendarView() {
  // need to set date to new Date();
  //current date is dummy data
  const [date, setDate] = useState("2024/02/07");
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

  function changeValue(val) {
    setDate(val);
  }
  useEffect(() => {
    async function getData() {
      let { data, error } = await supabase
        .from("Calendar")
        .select("*")
        .eq("created_at", date);
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
          {/* <p>The selected date is - {date.toLocaleDateString("en-GB")}</p> */}

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
