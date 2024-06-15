import { useEffect, useState } from "react";
import useSupabase from "./supabase";

const useMonthlyTotal = (firstDay, lastDay) => {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
  const [monthlyPetrolTotal, setMonthlyPetrolTotal] = useState(0);
  const [monthlyTyresTotal, setMonthlyTyresTotal] = useState(0);
  const [monthlyRepairsTotal, setMonthlyRepairsTotal] = useState(0);
  const [monthlyOtherCostsTotal, setMonthlyOtherCostsTotal] = useState(0);
  const [monthlyIncomeTotal, setMonthlyIncomeTotal] = useState(0);
  const [monthlyUlez, setMonthlyUlez] = useState(0);
  const [monthlyRoadTax, setMonthlyRoadTax] = useState(0);
  const [monthlyInsurance, setMonthlyInsurance] = useState(0);
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";

  const supabase = useSupabase();
  const arrayOfTotals = [];
  useEffect(() => {
    async function getMonth() {
      try {
        const { data, error } = await supabase
          .from("Calendar")
          .select("*")
          .gte("created_at", firstDay) // Start of month
          .lte("created_at", lastDay);

        let res = data;
        let sumTotal = 0;
        let sumPetrol = 0;
        let sumTyres = 0;
        let sumRepairs = 0;
        let sumIncome = 0;
        let sumOtherCosts = 0;
        let sumInsurance = 0;
        let sumUlez = 0;
        let sumRoadTax = 0;
        for (const key in res) {
          let elementTotal = res[key].total;
          let elementPetrol = res[key].petrol;
          let elementRepairs = res[key].repairs;
          let elementIncome = res[key].income;
          let elementOtherCosts = res[key].other_costs;
          let elementTyres = res[key].tyres;
          let elementInsurance = res[key].insurance;
          let elementRoadTax = res[key].road_tax;
          let elementUlez = res[key].ulez;
          sumTotal += elementTotal;
          sumPetrol += elementPetrol;
          sumTyres += elementTyres;
          sumRepairs += elementRepairs;
          sumIncome += elementIncome;
          sumOtherCosts += elementOtherCosts;
          sumInsurance += elementInsurance;
          sumUlez += elementUlez;
          sumRoadTax += elementRoadTax;
        }
        setMonthlyTotal(sumTotal);
        setMonthlyPetrolTotal(sumPetrol);
        setMonthlyIncomeTotal(sumIncome);
        setMonthlyTyresTotal(sumTyres);
        setMonthlyOtherCostsTotal(sumOtherCosts);
        setMonthlyRepairsTotal(sumRepairs);
        setMonthlyInsurance(sumInsurance);
        setMonthlyUlez(sumUlez);
        setMonthlyRoadTax(sumRoadTax);
        // if (error) {
        //   console.log(error);
        // }
      } catch (error) {
        console.error(error);
      }
    }
    getMonth();
  }, [supabase, firstDay, lastDay]);

  arrayOfTotals.push(
    monthlyTotal,
    monthlyPetrolTotal,
    monthlyTyresTotal,
    monthlyRepairsTotal,
    monthlyOtherCostsTotal,
    monthlyIncomeTotal,
    monthlyUlez,
    monthlyRoadTax,
    monthlyInsurance
  );
  return arrayOfTotals;
};

export default useMonthlyTotal;
