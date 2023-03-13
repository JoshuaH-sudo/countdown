import React from "react";
import register_root_component from "expo/build/launch/registerRootComponent";
import App from "./App";
import { Provider } from "react-redux";
import store from "./components/store/store";
import { EuiProvider } from "@elastic/eui";

const Root_app = () => (
  <Provider store={store}>
    <EuiProvider colorMode="dark">
      <App />
    </EuiProvider>
  </Provider>
)
register_root_component(Root_app);
