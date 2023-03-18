import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import { map_number, SVG_circle } from "./utils/svg";
import { EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { Countdown_goal } from "./common";

interface Countdown_props {
  goal: Countdown_goal;
}

const Countdown_display: FC<Countdown_props> = ({ goal }) => {
  const [timer, set_timer] = useState(0);
  const { name, start_date, end_date} = goal;

  const set_date_timer = () => {
    const current_date = moment();
    const new_timer = Date.now() + end_date.diff(current_date);

    set_timer(new_timer);
  };

  useEffect(() => {
    set_date_timer();
  }, [end_date]);

  interface Countdown_unit_ring_props {
    time_unit: "days" | "hours" | "minutes" | "seconds";
    amount: number;
  }
  const Countdown_unit_ring: FC<Countdown_unit_ring_props> = ({
    time_unit,
    amount,
  }) => {
    // Mapping the date values to radius values
    let max_amount: number;
    switch (time_unit) {
      case "days":
        max_amount = 365;
        break;

      case "hours":
        max_amount = 24;
        break;

      case "minutes":
        max_amount = 60;
        break;

      case "seconds":
        max_amount = 60;
        break;
    }
    let radius = map_number(amount, max_amount, 0, 0, 360);

    return (
      <EuiFlexGroup
        direction="column"
        style={{
          position: "relative",
          width: "100px",
          height: "100px",
        }}
      >
        <EuiFlexItem grow={false}>
          <SVG_circle radius={radius} />
        </EuiFlexItem>
        <EuiFlexItem style={{ alignSelf: "center" }} grow={false}>
          {amount}
        </EuiFlexItem>
        <EuiFlexItem style={{ alignSelf: "center" }} grow={false}>
          {time_unit}
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

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
      return <span>{name} Completed</span>;
    } else {
      if (api.isStopped()) api.start();
      // Render a countdown

      return (
        <EuiFlexGroup alignItems="center" justifyContent="center" wrap>
          {days && (
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring time_unit="days" amount={days} />
            </EuiFlexItem>
          )}
          {hours && (
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring time_unit="hours" amount={hours} />
            </EuiFlexItem>
          )}
          {minutes && (
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring time_unit="minutes" amount={minutes} />
            </EuiFlexItem>
          )}
          {seconds && (
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring time_unit="seconds" amount={seconds} />
            </EuiFlexItem>
          )}
        </EuiFlexGroup>
      );
    }
  };

  return (
    <Countdown date={moment().milliseconds() + timer} renderer={renderer} />
  );
};

export default Countdown_display;
