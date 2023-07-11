import React from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import Main_screen from "./components/screens/main/Main_screen";

export const storage_name = "countdown-goals";

export default function App() {
  return (
    <Main_screen />
  )
}
