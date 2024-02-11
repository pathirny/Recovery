import "./App.css";
import Header from "./components/Header";
import CalendarView from "./components/Calendar";
import { createClient } from "@supabase/supabase-js";

function App() {
  const supabaseUrl = "https://rksutahgreosodfhxyro.supabase.co";
  const supabase = createClient(
    supabaseUrl,
    process.env.REACT_APP_SUPABASE_KEY
  );

  return (
    <div className="App">
      <Header />
      <CalendarView props={supabase} />
    </div>
  );
}

export default App;
