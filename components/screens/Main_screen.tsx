import React, { FC } from "react";
import {
  EuiButton,
  EuiPageTemplate,
  EuiPanel,
  EuiPinnableListGroup,
  EuiPinnableListGroupItemProps,
} from "@elastic/eui";
import moment from "moment";
import { root_stack_param_list } from "../../App";
import Countdown_display from "../Countdown_display";
import use_database_store from "../store/database/use_database_store";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

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

  countdown_list.push(
    <EuiPanel>
      <EuiButton onClick={() => navigation.navigate("Goal_form")}>
        Add new goal
      </EuiButton>
    </EuiPanel>
  );

  // label: "Add New Goal",
  // color: "primary",
  // isActive: true,
  // pinnable: false,
  // onClick: () => navigation.navigate("Goal_form"),
  // const Main_screen_display = (
  //   <EuiPinnableListGroup
  //     maxWidth="600px"
  //     style={{
  //       maxHeight: "250px"
  //     }}
  //     wrapText={true}
  //     onPinClick={(item) => {}}
  //     listItems={display_items}
  //   />
  // );

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        <EuiPageTemplate.Section grow={false} color="subdued">
          {countdown_list}
        </EuiPageTemplate.Section>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Main_screen;
