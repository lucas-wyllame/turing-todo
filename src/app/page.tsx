"use client";

import { HomeContent } from "./_components/context";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export default function Home() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <HomeContent />
    </LocalizationProvider>
  );
}
