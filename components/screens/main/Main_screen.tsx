import React, { FC } from "react";
import { EuiButton, EuiPageTemplate, EuiPanel } from "@elastic/eui";
import { root_stack_param_list } from "../../../App";
import Countdown_display from "../../Countdown_display";
import use_database_store from "../../store/database/use_database_store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header_actions from "./Header_actions";

interface Main_screen_props
  extends NativeStackScreenProps<root_stack_param_list, "Main_screen"> {}
const Main_screen: FC<Main_screen_props> = ({ navigation }) => {
  const { database, remove_goal } = use_database_store();
  const { countdown_goals } = database;

  const countdown_list = countdown_goals.map((countdown_goal) => (
    <EuiPanel>
      <Countdown_display goal={countdown_goal} />
    </EuiPanel>
  ));

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        <EuiPageTemplate.Section grow={false} color="subdued">
          <Header_actions navigation={navigation}/>
        </EuiPageTemplate.Section>
        <EuiPageTemplate.Section grow={true} color="subdued">
          {countdown_list}
        </EuiPageTemplate.Section>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Main_screen;
