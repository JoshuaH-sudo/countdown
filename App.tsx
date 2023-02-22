import "@elastic/eui/dist/eui_theme_dark.css";
import React, { useEffect, useState } from "react";
import { EuiPageTemplate, EuiProvider } from "@elastic/eui";
import moment from "moment";
import Countdown_display from "./components/Countdown_display";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Countdown_goal_form from "./components/Countdown_goal_form";

export interface Countdown_goal {
  name: string;
  end_date: moment.Moment;
}

const storage_name = "countdown-goals";
export default function App() {
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

  const save_countdown_goals = async () => {
    await AsyncStorage.setItem(storage_name, JSON.stringify(countdown_goals));
  };

  useEffect(() => {
    save_countdown_goals();
  }, [countdown_goals]);

  const countdown_list = countdown_goals.map((countdown_goal) => (
    <EuiPageTemplate.Section grow={false} color="subdued">
      <Countdown_display
        goal_name={countdown_goal.name}
        end_date={countdown_goal.end_date}
      />
    </EuiPageTemplate.Section>
  ));

  const add_countdown_goal = (new_goal: Countdown_goal) => {
    const updated_goals = [...countdown_goals];
    updated_goals.push(new_goal);
    set_countdown_goals(updated_goals);
  };

  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
        <EuiPageTemplate.Section grow={false} color="subdued">
          <Countdown_goal_form add_countdown_goal={add_countdown_goal} />
        </EuiPageTemplate.Section>
        {countdown_list}
      </EuiPageTemplate>
    </EuiProvider>
  );
}
