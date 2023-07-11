import React, { FC } from "react";
import { EuiButtonIcon, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

interface Header_actions_props {}
const Header_actions: FC<Header_actions_props> = () => {
  const add_goal_handler = () => {
    // navigation.navigate("Goal_form")
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
