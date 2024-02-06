import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header";
import CalendarView from "./components/Calendar";

function App() {
  return (
    <div className="App">
      <Header />
      <CalendarView />
    </div>
  );
}

export default App;
