import React from "react";
import "@elastic/eui/dist/eui_theme_dark.css";
import { EuiProvider } from '@elastic/eui';
import { Main_screen } from './components/screens/Main_screen';

export default function App() {
  return (
    <EuiProvider colorMode="dark">
      <Main_screen/>
    </EuiProvider>
  );
}