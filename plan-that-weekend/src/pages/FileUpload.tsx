import React, { useState } from "react";
import Papa from "papaparse";
import { FileUploader } from "react-drag-drop-files";

interface HomeProps {
  setData: (data: string[]) => void;
}

type CsvRow = {
  Date: string; // Define the structure of the CSV rows
};

export const FileUpload: React.FC<HomeProps> = ({ setData }) => {
  const fileTypes: string[] = ["CSV"];
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (file: File): void => {
    setFile(file);
  };

  const handleParse = (): void => {
    if (!file) return alert("Enter a valid file");
    const reader = new FileReader();

    reader.onload = async (event: ProgressEvent<FileReader>) => {
      if (!event.target?.result) return;
      if (event.target && typeof event.target.result === "string") {
        const result = event.target.result;

        const csv = Papa.parse<CsvRow>(result, {
          header: true,
          skipEmptyLines: true, // To avoid empty rows
        });

        const parsedData = csv?.data ?? [];
        if (parsedData.length === 0) {
          alert("No data found in the CSV file");
          return;
        }

        const cleanedDate = parsedData.map((row) => row["Date"].trim());
        setData(cleanedDate);
      }
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <FileUploader
        multiple={false}
        handleChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file.name}` : "no files uploaded yet"}</p>
      <div>
        <button onClick={handleParse}>Parse</button>
      </div>
    </div>
  );
};
