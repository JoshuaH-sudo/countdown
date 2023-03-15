import {
  EuiButton,
  EuiButtonIcon,
  EuiFlexGroup,
  EuiFlexItem,
  EuiPageTemplate,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from "@elastic/eui";
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
  const { database, remove_goal } = use_database_store();
  const { countdown_goals } = database;

  const countdown_list: EuiPinnableListGroupItemProps[] = countdown_goals.map(
    (countdown_goal) => {
      return {
        id: countdown_goal.id,
        label: (
          <Countdown_display
            goal_name={countdown_goal.name}
            end_date={moment(countdown_goal.end_date)}
          />
        ),
        extraAction: {
          color: "danger",
          iconType: "cross",
          onClick: () => remove_goal(countdown_goal.id),
        },
      };
    }
  );

  const no_countdown_goals: EuiPinnableListGroupItemProps = {
    label: "No countdown goals",
  };
  const display_items =
    countdown_list.length !== 0 ? countdown_list : [no_countdown_goals];

  display_items.push({
    label: "Add New Goal",
    color: "primary",
    isActive: true,
    pinnable: false,
    onClick: () => navigation.navigate("Goal_form"),
  });

  const Main_screen_display = (
    <EuiPinnableListGroup
      maxWidth="600px"
      wrapText={true}
      onPinClick={(item) => {}}
      listItems={display_items}
    />
  );

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        <EuiPageTemplate.Section grow={false} color="subdued">
          {Main_screen_display}
        </EuiPageTemplate.Section>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Main_screen;
