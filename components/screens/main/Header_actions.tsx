import React, { FC } from "react";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { root_stack_param_list } from "../../../App";

interface Header_actions_props {
  navigation: NativeStackNavigationProp<
    root_stack_param_list,
    "Main_screen",
    undefined
  >;
}
const Header_actions: FC<Header_actions_props> = ({ navigation }) => {
  const add_goal_handler = () => {
    navigation.navigate("Goal_form")
  };

  return (
    <EuiFlexGroup justifyContent="spaceBetween" alignItems="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon
          id="add_goal_button"
          onClick={add_goal_handler}
          iconType="plusInCircleFilled"
          size="m"
          display="fill"
        />
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButtonIcon iconType="gear" size="m" display="fill" />
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default Header_actions;
