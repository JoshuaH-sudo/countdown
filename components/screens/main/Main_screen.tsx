import React, { FC } from "react";
import {
  EuiPageBody,
  EuiPageSection,
  EuiPageTemplate,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { root_stack_param_list } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header_actions from "./Header_actions";
import Countdown_list from "./Countdown_list";

interface Main_screen_props
  extends NativeStackScreenProps<root_stack_param_list, "Main_screen"> {}

const Main_screen: FC<Main_screen_props> = ({ navigation }) => {
  return (
    <EuiPageBody
      paddingSize="s"
      panelled={true}
      grow={true}
      style={{ maxHeight: "100vh" }}
    >
      <EuiPageSection paddingSize="none" grow={false} color="transparent">
        <EuiPanel paddingSize="xs">
          <Header_actions navigation={navigation} />
        </EuiPanel>
      </EuiPageSection>

      <EuiPageSection
        paddingSize="none"
        grow={true}
        color="transparent"
        style={{ overflow: "scroll" }}
      >
        <Countdown_list />
      </EuiPageSection>

      <EuiPageSection
        style={{ height: "10vh" }}
        paddingSize="none"
        grow={false}
        color="primary"
      >
        <EuiText textAlign="center">Ad Space</EuiText>
      </EuiPageSection>
    </EuiPageBody>
  );
};

export default Main_screen;
