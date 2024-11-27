import "./App.css";
import { useState } from "react";
import Topbar from "./components/Topbar";
import { Sidebar } from "./components/Sidebar";
import { LongWeekends } from "./pages/LongWeekends";

function App() {
  const [data, setData] = useState<string[]>([]);
  return (
    <>
      <Topbar></Topbar>
      <div className="flex">
        <Sidebar data={data} setData={setData} />
        <LongWeekends data={data}></LongWeekends>
      </div>
    </>
  );
}

export default App;
