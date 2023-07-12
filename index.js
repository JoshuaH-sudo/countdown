import React from "react";
import register_root_component from "expo/build/launch/registerRootComponent";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/store/store";
import { EuiProvider } from "@elastic/eui";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

//Need to use google's CDN to import google fonts as react native does not work with css files.
const Root_app = () => (
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Provider store={store}>
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
      />
      <EuiProvider colorMode="dark">
        <App />
      </EuiProvider>
    </Provider>
  </LocalizationProvider>
);
register_root_component(Root_app);
