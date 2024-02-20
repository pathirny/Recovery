import React, { useEffect, useState } from "react";
import Calendar from "react-calendar";
import { createClient } from "@supabase/supabase-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGasPump,
  faScrewdriverWrench,
  faTruckMonster,
  faReceipt,
  faMoneyBillWave,
} from "@fortawesome/free-solid-svg-icons";
import useMonthlyTotal from "../hooks/getMonthlyTotal";
import useYearlyTotal from "../hooks/getYearlyTotal";

export default function CalendarView() {
  // need to set date to new Date();
  //current date is dummy data
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0].replace(/-/g, "/")
  );
  const [showForm, setShowForm] = useState(false);
  const [petrol, setPetrol] = useState();
  const [tyres, setTyres] = useState();
  const [repairs, setRepairs] = useState();
  const [otherCosts, setOtherCosts] = useState();
  const [income, setIncome] = useState();
  const [total, setTotal] = useState();
  const [submitted, setSubmitted] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState();
  const [monthNumber, setMonthNumber] = useState(0);
  const [monthlyTotal, setMonthlyTotal] = useState();
  const [firstDay, setFirstDay] = useState("");
  const [lastDay, setLastDay] = useState("");
  const [yearDate, setYearDate] = useState();
  const [yearlyTotal, setYearlyTotal] = useState();

  // get supabase client
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );

  // function changeValue(val) {
  //   setDate(date);
  // }
  const onChange = (day) => {
    const formattedDate = `${day.getFullYear()}/${
      day.getMonth() + 1
    }/${day.getDate()}`;
    setSelectedDate(formattedDate);
    setShowForm(true);
  };
  // get the data from supabase
  useEffect(() => {
    async function getData() {
      try {
        let { data, error } = await supabase
          .from("Calendar")
          .select("*")
          .eq("created_at", selectedDate);

        let response = data;

        setOtherCosts(response[0].other_costs || 0);
        setRepairs(response[0].repairs || 0);
        setTyres(response[0].tyres || 0);
        setPetrol(response[0].petrol || 0);
        setIncome(response[0].income || 0);
      } catch (error) {
        console.log(error);
        // setOtherCosts(null);
        // setRepairs(0);
        // setTyres(0);
        // setPetrol(0);
        // setIncome(0);
      }
    }
    getData();
  }, [selectedDate, supabase]);

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

  // inserting new data
  async function insertData() {
    const { data, error } = await supabase
      .from("Calendar")
      .insert([
        {
          created_at: selectedDate,
          income: income,
          other_costs: otherCosts,
          petrol: petrol,
          repairs: repairs,
          tyres: tyres,
          total: total,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    }
  }

  function closeFormInsertData() {
    setShowForm(false);
    insertData();
    setSubmitted(true);

    setTimeout(() => {
      setSubmitted(false);
    }, 4000);
  }
  useEffect(() => {
    setIncome(0);
    setPetrol(0);
    setOtherCosts(0);
    setRepairs(0);
    setTyres(0);
  }, [selectedDate]);

  const onChangeMonth = (month) => {
    const formattedMonth = `${month.getFullYear()}/${
      month.getMonth() + 1
    }/${month.getDate()}`;
    setSelectedMonth(formattedMonth);
    setShowForm(true);
  };
  useEffect(() => {
    function splitMonth() {
      try {
        setMonthNumber(parseInt(selectedMonth.split("/")[1]) - 1);
      } catch (error) {
        console.log(error);
      }
    }
    splitMonth();
  }, [selectedMonth, supabase]);

  useEffect(() => {
    // this will be used to get a whole months totals added together when month is clicked on
    // Calculate first day of the selected month
    const firstDayOfMonth = new Date(
      new Date(selectedMonth).getFullYear(),
      new Date(selectedMonth).getMonth(),
      1
    );

    // Calculate last day of the selected month
    const lastDayOfMonth = new Date(
      new Date(selectedMonth).getFullYear(),
      new Date(selectedMonth).getMonth() + 1,
      0
    );

    // Format firstDay and lastDay as strings
    const firstDayFormatted = `${firstDayOfMonth.getFullYear()}/${
      firstDayOfMonth.getMonth() + 1
    }/${firstDayOfMonth.getDate()}`;
    const lastDayFormatted = `${lastDayOfMonth.getFullYear()}/${
      lastDayOfMonth.getMonth() + 1
    }/${lastDayOfMonth.getDate()}`;

    // Update firstDay and lastDay state variables
    setFirstDay(firstDayFormatted);
    setLastDay(lastDayFormatted);
  }, [selectedMonth]);

  const monthlyTotalFromHook = useMonthlyTotal(firstDay, lastDay);

  useEffect(() => {
    setMonthlyTotal(monthlyTotalFromHook);
  }, [monthlyTotalFromHook]);

  const onChangeYear = (year) => {
    const formattedYear = year.getFullYear();
    setYearDate(formattedYear);
    console.log(yearDate);
    setShowForm(true);
  };

  const yearlyTotalFromHook = useYearlyTotal(yearDate);

  useEffect(() => {
    setYearlyTotal(yearlyTotalFromHook);
  }, [yearlyTotalFromHook]);


  // get weekly data
  // useEffect(()=>{
  //   async function getWeekly(){
  //     try{

  //       for (let i = 0; i <= 6; i++){
  //         let {data, error} = await supabase
  //         .from("Calendar")
  //         .select("total")
  //         .eq("created_at", selectedDate)
  //         let response = data;
  //         console.log(selectedDate)
  //         console.log(response)
          
  //       }

  //     } catch (error){
  //       console.log(error)
  //     }
  //   }
  //   getWeekly()
  // },[selectedDate, supabase])


    function weeklyData(){
    let date = "2024/02/20"
    let splitDate = date.split("/")
    let daily = parseInt(splitDate[2])
     for(let i = 0; i < 7; i++){
      
      console.log(daily)
      daily++;
    }

    }
    weeklyData()
  return (
    <div>
      <Calendar
        onChange={onChange}
        value={selectedDate}
        defaultView="month"
        // need to format day to be a layout of 'year/month/day'
        onClickDay={onChange}
        onClickMonth={onChangeMonth}
        onClickYear={onChangeYear}
      />
      {showForm && (
        <div className="form">
          {/* <p>The selected date is - {date}</p> */}
          <form>
            <div className="formInputs">
              <label>Income</label>
              <FontAwesomeIcon icon={faMoneyBillWave} />
              <input
                type="number"
                name="income"
                value={income}
                onChange={(event) => setIncome(event.target.value)}
              />
            </div>
            <div className="formInputs">
              <label>Fuel</label>
              <FontAwesomeIcon icon={faGasPump} />
              <input
                type="number"
                name="Petrol"
                value={petrol}
                onChange={(event) => setPetrol(event.target.value)}
              />
            </div>
            <div className="formInputs">
              <label>Repairs</label>
              <FontAwesomeIcon icon={faScrewdriverWrench} />
              <input
                type="number"
                name="Repairs"
                value={repairs}
                onChange={(event) => setRepairs(event.target.value)}
              />
            </div>
            <div className="formInputs">
              <label>Tyres</label>
              <FontAwesomeIcon icon={faTruckMonster} />
              <input
                type="number"
                name="Tyres"
                value={tyres}
                onChange={(event) => setTyres(event.target.value)}
              />
            </div>
            <div className="formInputs">
              <label>Other Costs</label>
              <FontAwesomeIcon icon={faReceipt} />
              <input
                type="number"
                name="Other Costs"
                value={otherCosts}
                onChange={(event) => setOtherCosts(event.target.value)}
              />
            </div>

            <button
              type="button"
              className="submitForm"
              onClick={closeFormInsertData}
            >
              Submit
            </button>
          </form>
          <h2>Todays total is: £{total}</h2>
          {monthlyTotal > 0 && <h2>Your Monthly total is : £{monthlyTotal}</h2>}
          {yearlyTotal > 0 && <h2>Your Yearly total is : £{yearlyTotal}</h2>}
        </div>
      )}
      {submitted && (
        <div
          className="sentConfirm"
          style={{ bottom: submitted ? "5vh" : "-100px" }}
        >
          <h2>Sent!</h2>
        </div>
      )}
    </div>
  );
}
