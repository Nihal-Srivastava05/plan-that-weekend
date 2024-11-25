import "./App.css";
import { useState } from "react";
// import { FileUpload } from "./components/FileUpload";
import { Sidebar } from "./components/Sidebar";
import { LongWeekends } from "./pages/LongWeekends";

function App() {
  const [data, setData] = useState<string[]>([]);
  return (
    <div className="flex">
      <Sidebar setData={setData} />
      <LongWeekends data={data}></LongWeekends>
    </div>
  );
}

export default App;
