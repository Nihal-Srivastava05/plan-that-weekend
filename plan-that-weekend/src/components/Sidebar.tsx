import React from "react";
import { FileUpload } from "./FileUpload";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

interface SidebarProps {
  setData: (data: string[]) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ setData }) => {
  return (
    <Box sx={{ height: "100vh", alignContent: "center" }}>
      <Paper elevation={3} sx={{ height: "90%" }}>
        <FileUpload setData={setData} />
      </Paper>
    </Box>
  );
};
