import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { FC, useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";

interface Countdown_props {
  end_date: moment.Moment;
  item_id: string;
}

const Complete = () => <span>You are good to go!</span>;

const Countdown_display: FC<Countdown_props> = ({ end_date, item_id }) => {
  const [timer, set_timer] = useState(0);

  const set_date_timer = (date: moment.Moment) => {
    const current_date = moment();
    const new_timer = Date.now() + date.diff(current_date);

    set_timer(new_timer);
  };

  useState(() => {
    set_date_timer(end_date)
  },[end_date])

  // Renderer callback with condition
  const renderer: CountdownRendererFn = ({
    days,
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
      if (end_date && api.isStopped()) api.start();
      // Render a countdown
      return (
        <span>
          Days: {days}, Hours: {hours}, Minutes: {minutes}, Seconds: {seconds}
        </span>
      );
    }
  };

  return (
    <Countdown date={moment().milliseconds() + timer} renderer={renderer}>
      <Complete />
    </Countdown>
  );
};

export default Countdown_display;