import "./App.css";
import { useState } from "react";
import { Home } from "./pages/Home";
import { LongWeekends } from "./pages/LongWeekends";

function App() {
  const [data, setData] = useState<string[]>([]);
  return (
    <div className="flex">
      <Home setData={setData}></Home>
      <LongWeekends data={data}></LongWeekends>
    </div>
  );
}

export default App;
