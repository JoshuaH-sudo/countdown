import "@elastic/eui/dist/eui_theme_dark.css";
import { useState } from "react";
import {
  EuiPageTemplate,
  EuiProvider,
  EuiForm,
  EuiDatePicker,
  EuiFormRow
} from "@elastic/eui";
import Countdown, { CountdownRendererFn } from "react-countdown";
import moment from "moment";

const Complete = () => <span>You are good to go!</span>;

export default function App() {
  const [end_date, set_end_date] = useState(moment());
  const [timer, set_timer] = useState(0);

  const handle_change = (date: moment.Moment) => {
    const current_date = moment();
    const new_timer = Date.now() + date.diff(current_date);

    set_timer(new_timer);
    set_end_date(date);
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
      return <Complete />;
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
