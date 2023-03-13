import { EuiButton, EuiPageTemplate } from "@elastic/eui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { ReactNode, FC } from "react";
import { root_stack_param_list } from "../../App";
import Countdown_display from "../Countdown_display";
import use_database_store from "../store/database/use_database_store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

interface Main_screen_props
  extends NativeStackScreenProps<root_stack_param_list, "Main_screen"> {}
const Main_screen: FC<Main_screen_props> = ({ navigation }) => {
  const { database } = use_database_store();
  const { countdown_goals } = database;

  const countdown_list = countdown_goals.map((countdown_goal) => (
    <EuiPageTemplate.Section grow={false} color="subdued">
      <Countdown_display
        goal_name={countdown_goal.name}
        end_date={moment(countdown_goal.end_date)}
      />
    </EuiPageTemplate.Section>
  ));

  const no_countdown_goals = (
    <div>
      <h1>No countdown goals</h1>
    </div>
  );

  let Main_screen_display: ReactNode;
  if (countdown_list.length === 0) {
    Main_screen_display = no_countdown_goals;
  } else {
    Main_screen_display = countdown_list;
  }

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        {Main_screen_display}
      </EuiPageTemplate.Section>
      <EuiPageTemplate.Section grow={false} color="subdued">
        <EuiButton onClick={() => navigation.navigate("Goal_form")}>
          New Goal
        </EuiButton>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Main_screen;
