import {
  EuiForm,
  EuiFormRow,
  EuiDatePicker,
  EuiButton,
  EuiFieldText,
  EuiPageTemplate,
} from "@elastic/eui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import React, { FC, useEffect, useState } from "react";
import { root_stack_param_list, storage_name } from "../../App";
import { Countdown_goal } from "./Main_screen";

export type Countdown_goal_form_props = NativeStackScreenProps<root_stack_param_list, "Goal_form">

const Countdown_goal_form: FC<Countdown_goal_form_props> = ({ navigation }) => {
  const [end_date, set_end_date] = useState<moment.Moment>(moment());
  const [name, set_name] = useState("");

  const change_date_handler = (date: moment.Moment) => {
    set_end_date(date.clone());
  };

  const change_name_handler = (event: any) => {
    set_name(event.target.value);
  };

  const [countdown_goals, set_countdown_goals] = useState<Countdown_goal[]>([]);

  const get_countdown_goals = async () => {
    const countdown_goal_store = await AsyncStorage.getItem(storage_name);
    if (!countdown_goal_store) {
      console.debug("no end date in storage");
      return;
    }

    const retrieved_countdown_goals: Countdown_goal[] =
      JSON.parse(countdown_goal_store);

    const parsed_goals = retrieved_countdown_goals.map((goal) => {
      return {
        name: goal.name,
        end_date: moment(goal.end_date),
      };
    });

    console.debug(
      "Returned end-date",
      retrieved_countdown_goals,
      countdown_goal_store
    );
    set_countdown_goals(parsed_goals);
  };

  useEffect(() => {
    get_countdown_goals();
  }, []);

  const save_countdown_goals = async (goals: Countdown_goal[]) => {
    await AsyncStorage.setItem(storage_name, JSON.stringify(goals));
    navigation.navigate("Main_screen");
  };

  const add_countdown_goal = (new_goal: Countdown_goal) => {
    const updated_goals = [...countdown_goals];
    updated_goals.push(new_goal);
    save_countdown_goals(updated_goals);
  };

  const on_submit_handler = () => {
    add_countdown_goal({
      name,
      end_date,
    });
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
            <EuiButton onClick={on_submit_handler}>Save</EuiButton>
          </EuiFormRow>
        </EuiForm>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
}

export default Countdown_goal_form;
