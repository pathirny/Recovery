import { useEffect, useState } from "react";
import useSupabase from "./supabase";

const useYearlyTotal = (yearDate) => {
  const [yearlyTotal, setYearlyTotal] = useState();

  const supabase = useSupabase();

  useEffect(() => {
    async function getYear() {
      try {
        const { data, error } = await supabase
          .from("Calendar")
          .select("total")
          .gte("created_at", `${yearDate}-01-01`)
          .lte("created_at", `${yearDate}-12-31`);

        let response = data;
        let sumTotal = 0;
        for (const key in response) {
          let elementTotal = response[key].total;
          sumTotal += elementTotal;
        }
        setYearlyTotal(sumTotal);
        console.log(response);
      } catch (error) {}
    }
    getYear();
  }, [yearDate]);
  return yearlyTotal;
};

export default useYearlyTotal;
