import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const useMonthlyTotal = (firstDay, lastDay) => {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [monthlyPetrolTotal, setMonthlyPetrolTotal] = useState(0);
  const [monthlyTyresTotal, setMonthlyTyresTotal] = useState(0);
  const [monthlyRepairsTotal, setMonthlyRepairsTotal] = useState(0);
  const [monthlyOtherCostsTotal, setMonthlyOtherCostsTotal] = useState(0);
  const [monthlyIncomeTotal, setMonthlyIncomeTotal] = useState(0);
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );

  useEffect(() => {
    async function getMonth() {
      try {
        const { data, error } = await supabase
          .from("Calendar")
          .select("*")
          .gt("created_at", firstDay) // Start of month
          .lte("created_at", lastDay);

        let res = data;
        let sumTotal = 0;
        let sumPetrol = 0;
        let sumTyres = 0;
        let sumRepairs = 0;
        let sumIncome = 0;
        let sumOtherCosts = 0;
        for (const key in res) {
          let elementTotal = res[key].total;
          let elementPetrol = res[key].petrol;
          let elementRepairs = res[key].repairs;
          let elementIncome = res[key].income;
          let elementOtherCosts = res[key].other_costs;
          let elementTyres = res[key].tyres;
          sumTotal += elementTotal;
          sumPetrol += elementPetrol;
          sumTyres += elementTyres;
          sumRepairs += elementRepairs;
          sumIncome += elementIncome;
          sumOtherCosts += elementOtherCosts;
        }
        setMonthlyTotal(sumTotal);
        setMonthlyPetrolTotal(sumPetrol);
        setMonthlyIncomeTotal(sumIncome);
        setMonthlyTyresTotal(sumTyres);
        setMonthlyOtherCostsTotal(sumOtherCosts);
        setMonthlyRepairsTotal(sumRepairs);
        console.log(res)
        if (error) {
          console.log(error);
        }
      }  catch (error) {}
    }
    getMonth();
  }, [supabase, firstDay, lastDay]);

  return {monthlyTotal, monthlyIncomeTotal, monthlyOtherCostsTotal, monthlyPetrolTotal, monthlyRepairsTotal, monthlyTyresTotal};
};

export default useMonthlyTotal;
