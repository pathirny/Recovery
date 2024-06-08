import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

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
          .gte("created_at", firstDay)
          .lte("created_at", lastDay);

        if (error) {
          console.error(error);
          return;
        }

        if (!data) {
          console.log("No data found");
          return;
        }

        let sumTotal = 0;
        let sumPetrol = 0;
        let sumTyres = 0;
        let sumRepairs = 0;
        let sumIncome = 0;
        let sumOtherCosts = 0;
        let sumInsurance = 0;
        let sumUlez = 0;
        let sumRoadTax = 0;

        data.forEach((item) => {
          sumTotal += item.total || 0;
          sumPetrol += item.petrol || 0;
          sumTyres += item.tyres || 0;
          sumRepairs += item.repairs || 0;
          sumIncome += item.income || 0;
          sumOtherCosts += item.other_costs || 0;
          sumInsurance += item.insurance || 0;
          sumUlez += item.ulez || 0;
          sumRoadTax += item.road_tax || 0;
        });

        setMonthlyTotal(sumTotal);
        setMonthlyPetrolTotal(sumPetrol);
        setMonthlyTyresTotal(sumTyres);
        setMonthlyRepairsTotal(sumRepairs);
        setMonthlyIncomeTotal(sumIncome);
        setMonthlyOtherCostsTotal(sumOtherCosts);
        setMonthlyInsurance(sumInsurance);
        setMonthlyUlez(sumUlez);
        setMonthlyRoadTax(sumRoadTax);
      } catch (error) {
        console.error(error);
      }
    }
    getMonth();
  }, [firstDay, lastDay]);

  const arrayOfTotals = [
    monthlyTotal,
    monthlyPetrolTotal,
    monthlyIncomeTotal,
    monthlyTyresTotal,
    monthlyOtherCostsTotal,
    monthlyRepairsTotal,
    monthlyInsurance,
    monthlyUlez,
    monthlyRoadTax,
  ];

  return monthlyTotal;
};

export default useMonthlyTotal;
