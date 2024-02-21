import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const useMonthlyTotal = (firstDay, lastDay) => {
  const [monthlyTotal, setMonthlyTotal] = useState(0);
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
          .select("total")
          .gt("created_at", firstDay) // Start of month
          .lte("created_at", lastDay);

        let res = data;
        let sumTotal = 0;
        for (const key in res) {
          let elementTotal = res[key].total;
          sumTotal += elementTotal;
        }
        setMonthlyTotal(sumTotal);
      } catch (error) {}
    }
    getMonth();
  }, [supabase, firstDay, lastDay]);

  return monthlyTotal;
};

export default useMonthlyTotal;
