import "@elastic/eui/dist/eui_theme_dark.css";
import React, { useState } from "react";
import {
  EuiPageTemplate,
  EuiProvider,
  EuiForm,
  EuiDatePicker,
  EuiFormRow,
} from "@elastic/eui";
import Countdown, {
  CountdownRendererFn,
  CountdownTimeDeltaFormatted,
} from "react-countdown";
import moment from "moment";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Complete = () => <span>You are good to go!</span>;

export default function App() {
  const [end_date, set_end_date] = useState<moment.Moment>(moment());
  const [timer, set_timer] = useState(0);

  const set_date_timer = async (date: moment.Moment) => {
    const current_date = moment();
    const new_timer = Date.now() + date.diff(current_date);

    set_timer(new_timer);
    set_end_date(date);
  };

  const init_end_date = async () => {
    const end_date_store = await AsyncStorage.getItem("end-date");
    if (!end_date_store) {
      console.debug("no end date in storage");
      set_date_timer(moment());
      return;
    }

    const set_end_date = moment(JSON.parse(end_date_store));
    console.debug("Returned end-date", end_date_store, set_end_date);
    set_date_timer(set_end_date);
  };

  useState(() => {
    init_end_date();
  }, []);

  const store_end_date = async () => {
    await AsyncStorage.setItem("end-date", JSON.stringify(end_date));
  };

  useState(() => {
    store_end_date();
  }, [end_date]);

  // Renderer callback with condition
  const renderer: CountdownRendererFn = ({
    days,
    hours,
    minutes,
    seconds,
    completed,
    formatted,
    api,
  }) => {
    console.debug(formatted);
    if (completed) {
      // Render a completed state
      return <Complete />;
    } else {
      if (end_date && api.isStopped()) api.start();
      // Render a countdown
      return (
        <span>
          {days}:{hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  const handle_change = (date: moment.Moment) => {
    set_date_timer(date);
  };

  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
        <EuiPageTemplate.Section grow={false} color="subdued">
          <EuiForm>
            <EuiFormRow label="Select a date">
              <EuiDatePicker
                showTimeSelect
                selected={end_date}
                onChange={handle_change}
              />
            </EuiFormRow>
            <EuiFormRow label="Countdown">
              <Countdown
                date={new Date().getMilliseconds() + timer}
                renderer={renderer}
              >
                <Complete />
              </Countdown>
            </EuiFormRow>
          </EuiForm>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
}
