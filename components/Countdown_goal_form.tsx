import {
  EuiForm,
  EuiFormRow,
  EuiDatePicker,
  EuiButton,
  EuiFieldText,
} from "@elastic/eui";
import moment from "moment";
import React, { useState } from "react";
import { Countdown_goal } from "./screens/Main_screen";

export interface Countdown_goal_form_props {
  add_countdown_goal: (goal: Countdown_goal) => void;
}

function Countdown_goal_form({
  add_countdown_goal,
}: Countdown_goal_form_props) {
  const [end_date, set_end_date] = useState<moment.Moment>(moment());
  const [name, set_name] = useState("");

  const change_date_handler = (date: moment.Moment) => {
    set_end_date(date.clone());
  };

  const change_name_handler = (event: any) => {
    set_name(event.target.value);
  };

  const on_submit_handler = () => {
    add_countdown_goal({
      name,
      end_date,
    });
  };

  return (
    <EuiForm>
      <EuiFormRow label="Name">
        <EuiFieldText value={name} onChange={change_name_handler} />
      </EuiFormRow>

      <EuiFormRow label="Select a date">
        <EuiDatePicker
          showTimeSelect
          selected={end_date}
          onChange={change_date_handler}
        />
      </EuiFormRow>

      <EuiFormRow>
        <EuiButton onClick={on_submit_handler}>Save</EuiButton>
      </EuiFormRow>
    </EuiForm>
  );
}

export default Countdown_goal_form;
