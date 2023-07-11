import React, { FC } from "react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/store/store";
import { EuiProvider } from "@elastic/eui";
import { createRoot } from "react-dom/client";

const Root_app = (
  <Provider store={store}>
    <EuiProvider colorMode="dark">
      <App />
    </EuiProvider>
  </Provider>
);

const root_element = document.getElementById("root");
if (!root_element) {
  throw new Error("Root element not found");
}

const root = createRoot(root_element);
root.render(Root_app);
