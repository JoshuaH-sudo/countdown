import { useEuiTheme } from "@elastic/eui";
import React from "react";

export const SVG_circle = ({ radius }) => {
  const { euiTheme } = useEuiTheme();
  return (
    <svg
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100px",
        height: "100px",
      }}
    >
      <path
        fill="none"
        stroke={euiTheme.colors.primary}
        stroke-width="4"
        d={describe_arc(50, 50, 48, 0, radius)}
      />
    </svg>
  );
};

// From StackOverflow: https://stackoverflow.com/questions/5736398/how-to-calculate-the-svg-path-for-an-arc-of-a-circle
export function polar_to_cartesian(
  center_x,
  center_y,
  radius,
  angle_in_degrees
) {
  var angle_in_radians = ((angle_in_degrees - 90) * Math.PI) / 180.0;
  return {
    x: center_x + radius * Math.cos(angle_in_radians),
    y: center_y + radius * Math.sin(angle_in_radians),
  };
}

export function describe_arc(x, y, radius, start_angle, end_angle) {
  var start = polar_to_cartesian(x, y, radius, end_angle);
  var end = polar_to_cartesian(x, y, radius, start_angle);
  var large_arc_flag = end_angle - start_angle <= 180 ? "0" : "1";

  var d = [
    "M",
    start.x,
    start.y,
    "A",
    radius,
    radius,
    0,
    large_arc_flag,
    0,
    end.x,
    end.y,
  ].join(" ");

  return d;
}

// From StackOverflow: https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
export function map_number(number, in_min, in_max, out_min, out_max) {
  return (
    ((number - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
  );
}
