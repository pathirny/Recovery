import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://axvfdngzlmsisbyqzmcl.supabase.co";
const supabase = createClient(supabaseUrl, process.env.REACT_APP_SUPABASE_KEY);

export default function useSupabase() {
  return supabase;
}
