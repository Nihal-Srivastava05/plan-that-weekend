import { useState } from "react";
import Papa from "papaparse";
import { FileUploader } from "react-drag-drop-files";
import { Button } from "./ui/Button";
import { useToast } from "../hooks/useToast";
import { useHolidays } from "../hooks/useHolidays";

type CsvRow = {
  Date: string;
};

export function FileUpload() {
  const { importHolidays } = useHolidays();
  const fileTypes: string[] = ["CSV"];
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  const handleChange = (file: File): void => {
    setFile(file);
  };

  const handleParse = (): void => {
    if (!file) {
      toast.error("Please select a file first");
      return;
    }

    setIsLoading(true);
    const reader = new FileReader();

    reader.onload = async (event: ProgressEvent<FileReader>) => {
      try {
        if (!event.target?.result || typeof event.target.result !== "string") {
          throw new Error("Failed to read file");
        }

        const result = event.target.result;
        const csv = Papa.parse<CsvRow>(result, {
          header: true,
          skipEmptyLines: true,
        });

        const parsedData = csv?.data ?? [];
        if (parsedData.length === 0) {
          toast.warning("No data found in the CSV file");
          return;
        }

        const cleanedDates = parsedData
          .map((row) => row["Date"]?.trim())
          .filter(Boolean);

        if (cleanedDates.length === 0) {
          toast.error("No valid dates found in the CSV file");
          return;
        }

        importHolidays(cleanedDates);
        setFile(null);
      } catch (error) {
        toast.error("Failed to parse CSV file");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    reader.onerror = () => {
      toast.error("Failed to read file");
      setIsLoading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div className="space-y-3">
      <div className="overflow-hidden">
        <FileUploader
          multiple={false}
          handleChange={handleChange}
          name="file"
          types={fileTypes}
          classes="!border-primary-300 dark:!border-primary-700 !max-w-full"
        />
      </div>
      <div className="flex flex-col gap-2">
        <p className="text-sm text-neutral-600 dark:text-neutral-400 truncate">
          {file ? `File: ${file.name}` : "No file selected"}
        </p>
        <Button
          onClick={handleParse}
          disabled={!file}
          isLoading={isLoading}
          size="sm"
          fullWidth
        >
          Import Holidays
        </Button>
      </div>
    </div>
  );
}
