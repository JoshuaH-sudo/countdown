import { EuiButton, EuiPageTemplate } from "@elastic/eui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useState, useEffect, ReactNode, FC } from "react";
import { root_stack_param_list, storage_name } from "../../App";
import Countdown_display from "../Countdown_display";
import { NativeStackScreenProps } from '@react-navigation/native-stack';

export interface Countdown_goal {
  name: string;
  end_date: moment.Moment;
}

interface Main_screen_props extends NativeStackScreenProps<root_stack_param_list, 'Main_screen'> {}

const Main_screen: FC<Main_screen_props>  = ({ navigation }) => {
  const [countdown_goals, set_countdown_goals] = useState<Countdown_goal[]>([]);

  const get_countdown_goals = async () => {
    console.debug("Getting goals")
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
    const unsubscribe = navigation.addListener('focus', () => {
      get_countdown_goals();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, []);

  const countdown_list = countdown_goals.map((countdown_goal) => (
    <EuiPageTemplate.Section grow={false} color="subdued">
      <Countdown_display
        goal_name={countdown_goal.name}
        end_date={countdown_goal.end_date}
      />
    </EuiPageTemplate.Section>
  ));

  const no_coundown_goals = (
    <div>
      <h1>No countdown goals</h1>
    </div>
  );

  let Main_screen_display: ReactNode;
  if (countdown_list.length === 0) {
    Main_screen_display = no_coundown_goals;
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
}

export default Main_screen