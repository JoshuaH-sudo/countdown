import React from "react";
import moment from "moment";
import { FC, useEffect, useState } from "react";
import Countdown, { CountdownRendererFn } from "react-countdown";
import {
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiTitle,
} from "@elastic/eui";
import { CircularProgressbarWithChildren } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Serialized_countdown_goal } from "../../common";

interface Countdown_props {
  goal: Serialized_countdown_goal;
}

const Countdown_display: FC<Countdown_props> = ({ goal }) => {
  const [timer, set_timer] = useState(0);
  const { name, start_date, end_date } = goal;

  const set_date_timer = () => {
    // The countdown start point needs to be relative to the current date difference.
    const current_date = moment();
    const new_timer = Date.now() + moment(end_date).diff(current_date);

    set_timer(new_timer);
  };

  useEffect(() => {
    set_date_timer();
  }, [end_date]);

  interface Countdown_unit_ring_props {
    unit: "days" | "hours" | "minutes" | "seconds";
    amount: number;
  }

  const Countdown_unit_ring: FC<Countdown_unit_ring_props> = ({
    unit,
    amount = 0,
  }) => {
    // Mapping the date values to radius values
    let max_amount: number;
    switch (unit) {
      case "days":
        /*
         * This is the max time unit which all other units divide from.
         * To get the percentage different we need to subtract from when the timer was created.
         * If we use the current date the percentage difference it will not reflect the days that have passed.
         */
        max_amount = moment(end_date).diff(moment(start_date), "days");
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

    return (
      <div
        style={{
          width: "4em",
          height: "4em",
        }}
      >
        <CircularProgressbarWithChildren
          minValue={0}
          maxValue={max_amount}
          value={amount}
          strokeWidth={10}
        >
          <EuiTitle size="m">
            <EuiText>{amount}</EuiText>
          </EuiTitle>
          <EuiText size="s">{unit}</EuiText>
        </CircularProgressbarWithChildren>
      </div>
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
    const display_name = completed ? `${name} Completed` : name;
    if (api.isStopped()) api.start();

    // Render the countdown
    return (
      <EuiFlexGroup
        alignItems="center"
        justifyContent="flexStart"
        direction="column"
      >
        <EuiFlexItem grow={false}>
          <EuiFlexGroup justifyContent="center" alignItems="center" responsive={false}>
            <EuiFlexItem>
              <EuiTitle size="s">
                <EuiText>{display_name}</EuiText>
              </EuiTitle>
            </EuiFlexItem>

            <EuiFlexItem grow={false}>
              <EuiFlexGroup
                alignItems="center"
                direction="column"
                justifyContent="flexStart"
              >
                <EuiFlexItem grow={false}>
                  <EuiButtonIcon
                    iconType="cross"
                    display="fill"
                    // onClick={() => delete_goal(id)}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>

        <EuiFlexItem grow={true}>
          <EuiFlexGroup
            alignItems="center"
            justifyContent="flexStart"
            responsive={false}
          >
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring unit="days" amount={days} />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring unit="hours" amount={hours} />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring unit="minutes" amount={minutes} />
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <Countdown_unit_ring unit="seconds" amount={seconds} />
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
      </EuiFlexGroup>
    );
  };

  return (
    <Countdown date={moment().milliseconds() + timer} renderer={renderer} />
  );
};

export default Countdown_display;
