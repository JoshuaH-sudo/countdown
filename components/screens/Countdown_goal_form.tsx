import {
  EuiForm,
  EuiFormRow,
  EuiDatePicker,
  EuiButton,
  EuiFieldText,
  EuiPageTemplate,
} from "@elastic/eui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import React, { FC, useState } from "react";
import { root_stack_param_list } from "../../App";
import use_database_store from "../store/database/use_database_store";

export type Countdown_goal_form_props = NativeStackScreenProps<
  root_stack_param_list,
  "Goal_form"
>;

const Countdown_goal_form: FC<Countdown_goal_form_props> = ({ navigation }) => {
  const { add_goal } = use_database_store();
  const [end_date, set_end_date] = useState<moment.Moment>(moment());
  const [name, set_name] = useState("");

  const change_date_handler = (date: moment.Moment) => {
    set_end_date(date.clone());
  };

  const change_name_handler = (event: any) => {
    set_name(event.target.value);
  };

  const on_submit_handler = () => {
    add_goal({
      name,
      end_date,
      start_date: moment(),
    });
    navigation.navigate("Main_screen");
  };

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
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
            <EuiButton onClick={on_submit_handler}>Add</EuiButton>
          </EuiFormRow>
        </EuiForm>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Countdown_goal_form;
