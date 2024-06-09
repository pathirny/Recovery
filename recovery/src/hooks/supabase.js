import { createClient } from "@supabase/supabase-js";

export default function useSupabase() {
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );

  return supabase;
}
