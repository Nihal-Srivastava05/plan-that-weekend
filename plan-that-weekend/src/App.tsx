import "./App.css";
import { useState } from "react";
import { FileUpload } from "./pages/FileUpload";
import { LongWeekends } from "./pages/LongWeekends";

function App() {
  const [data, setData] = useState<string[]>([]);
  return (
    <div className="flex">
      <FileUpload setData={setData} />
      <LongWeekends data={data}></LongWeekends>
    </div>
  );
}

export default App;
