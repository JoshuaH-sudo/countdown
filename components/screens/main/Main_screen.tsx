import React, { FC } from "react";
import { EuiPageTemplate, EuiPanel } from "@elastic/eui";
import { root_stack_param_list } from "../../../App";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import Header_actions from "./Header_actions";
import Countdown_list from "./Countdown_list";

interface Main_screen_props
  extends NativeStackScreenProps<root_stack_param_list, "Main_screen"> {}
  
const Main_screen: FC<Main_screen_props> = ({ navigation }) => {
  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section
        paddingSize="s"
        restrictWidth={true}
        grow={true}
        color="subdued"
      >
        <EuiPanel paddingSize="xs">
          <EuiPageTemplate.Section
            paddingSize="none"
            grow={false}
            color="transparent"
          >
            <Header_actions navigation={navigation} />
          </EuiPageTemplate.Section>

          <EuiPageTemplate.Section
            paddingSize="none"
            grow={true}
            color="transparent"
          >
            <Countdown_list />
          </EuiPageTemplate.Section>
        </EuiPanel>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Main_screen;
