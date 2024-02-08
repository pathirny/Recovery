import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { createClient } from "@supabase/supabase-js";

export default function CalendarView() {
  // need to set date to new Date();
  //current date is dummy data
  const [date, setDate] = useState(new Date("2024/02/08"));
  const [event, setEvent] = useState();
  const [showForm, setShowForm] = useState(false);
  const [calendarData, setCalendarData] = useState();
  const [costs, setCosts] = useState();
  const [income, setIncome] = useState();
  const [total, setTotal] = useState();
  const [sending, setSending] = useState(false);
  // get supabase client
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );

  function changeValue(date) {
    setDate(date);
  }

  // get the data from supabase
  useEffect(() => {
    if (sending) {
      async function getData() {
        let { data, error } = await supabase
          .from("Calendar")
          .select("*")
          .eq("created_at", date);
        let response = data;
        setCosts(response[0].costs);
        setIncome(response[0].income);
        if (error) {
          console.log(error);
        }
      }
      getData();
    }
  }, []);
  console.log(date);

  // take away costs from income
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
        // need to format day to be a layout of 'year/month.day'
        onClickDay={(day) => {
          if (day) {
            setShowForm(true);
            setDate(day);
            console.log(date);
            setSending(true);
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
          <h2>Todays total is: {total}</h2>
        </div>
      )}
    </div>
  );
}
