import "./App.css";
import Header from "./components/Header";
import CalendarView from "./components/Calendar";
function App() {
  function docName() {
    document.title = "Pat Recovery";
  }
  docName();
  return (
    <div className="App">
      <Header />
      <CalendarView />
    </div>
  );
}

export default App;
