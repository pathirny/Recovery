import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const useYearlyTotal = (yearDate) => {
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );

  useEffect(() => {
    async function getYear() {
      try {
        const { data, error } = await supabase
          .from("Calendar")
          .select("total")
          .gte("created_at", `${yearDate}-01-01`)
          .lte("created_at", `${yearDate}-12-31`);

        let response = data;
        console.log(response);

        if (error) {
          console.log(error);
        }
      } catch (error) {
        console.log(error);
      }
    }
    getYear();
  }, [supabase, yearDate]);
};

export default useYearlyTotal;
