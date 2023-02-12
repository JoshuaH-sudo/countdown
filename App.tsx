import "@elastic/eui/dist/eui_theme_dark.css";
import React, { useState } from "react";
import {
  EuiText,
  EuiPageTemplate,
  EuiProvider,
  EuiForm,
  EuiDatePicker,
  EuiFormRow,
} from "@elastic/eui";
import { StyleSheet } from "react-native";
import Countdown, { CountdownRendererFn } from "react-countdown";
import moment from "moment";

const Completionist = () => <span>You are good to go!</span>;

export default function App() {
  const [startDate, setStartDate] = useState(moment());
  const [timer, setTimer] = useState(0);

  const handleChange = (date: moment.Moment) => {
    const current_date = moment();
    const new_timer = Date.now() + date.diff(current_date);

    console.log(current_date);
    console.log(date);
    console.log(new_timer);

    setTimer(new_timer);
    setStartDate(date);
  };

  // Renderer callback with condition
  const renderer: CountdownRendererFn = ({
    hours,
    minutes,
    seconds,
    completed,
    api,
  }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      if (api.isStopped()) api.start();
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
        <EuiPageTemplate.Section grow={false} color="subdued">
          <EuiForm>
            <EuiFormRow label="Select a date">
              <EuiDatePicker
                showTimeSelect
                selected={startDate}
                onChange={handleChange}
              />
            </EuiFormRow>
            <EuiFormRow label="Countdown">
              <Countdown
                date={new Date().getMilliseconds() + timer}
                renderer={renderer}
              >
                <Completionist />
              </Countdown>
            </EuiFormRow>
          </EuiForm>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
