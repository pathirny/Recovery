import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { createClient } from "@supabase/supabase-js";

export default function CalendarView() {
  // need to set date to new Date();
  //current date is dummy data
  const [date, setDate] = useState(
    new Date().toISOString().split("T")[0].replace(/-/g, "/")
  );
  const [event, setEvent] = useState();
  const [showForm, setShowForm] = useState(true);
  const [calendarData, setCalendarData] = useState();
  const [petrol, setPetrol] = useState();
  const [tyres, setTyres] = useState();
  const [repairs, setRepairs] = useState();
  const [otherCosts, setOtherCosts] = useState();
  const [income, setIncome] = useState();
  const [total, setTotal] = useState();
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
    async function getData() {
      let { data, error } = await supabase
        .from("Calendar")
        .select("*")
        .eq("created_at", date);
      let response = data;
      console.log(response);
      setOtherCosts(response[0].other_costs);
      setRepairs(response[0].repairs);
      setTyres(response[0].tyres);
      setPetrol(response[0].petrol);
      setIncome(response[0].income);
      if (error) {
        console.log(error);
      }
    }
    getData();
  }, []);

  // take away costs from income
  useEffect(() => {
    if (
      income !== undefined &&
      otherCosts !== undefined &&
      petrol !== undefined &&
      repairs !== undefined &&
      tyres !== undefined
    ) {
      let amount =
        parseInt(income) -
        parseInt(otherCosts) -
        parseInt(repairs) -
        parseInt(tyres) -
        parseInt(petrol);
      setTotal(amount);
    }
  }, [income, otherCosts, repairs, tyres, petrol]);

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
            setDate(date);
          } else {
            setShowForm(false);
          }
        }}
      />
      {showForm && (
        <div className="form">
          <p>The selected date is - {date}</p>

          <form>
            <label>Income</label>
            <input type="number" name="income" />
            <label>Petrol</label>
            <input type="number" name="Petrol" />
            <label>Repairs</label>
            <input type="number" name="Repairs" />
            <label>Tyres</label>
            <input type="number" name="Tyres" />
            <label>Other Costs</label>
            <input type="number" name="Other Costs" />
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
