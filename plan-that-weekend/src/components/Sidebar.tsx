import React from "react";
import { FileUpload } from "./FileUpload";
import AddHolidays from "./AddHolidays";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import ListItem from "@mui/material/ListItem";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { Divider } from "@mui/material";

interface SidebarProps {
  data: string[];
  setData: (data: string[] | ((oldArray: string[]) => string[])) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ data, setData }) => {
  return (
    <Box sx={{ height: "100vh", alignContent: "center" }}>
      <Paper elevation={3} sx={{ height: "90%" }}>
        <FileUpload setData={setData} />
        <Divider />
        <AddHolidays setData={setData} />
        {data.map((holiday) => {
          return (
            <ListItem>
              <ListItemIcon>
                <BeachAccessIcon />
              </ListItemIcon>
              <ListItemText primary={holiday} />
            </ListItem>
          );
        })}
      </Paper>
    </Box>
  );
};
