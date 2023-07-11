import React, { FC } from "react";
import {
  EuiPageBody,
  EuiPageSection,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import Header_actions from "./Header_actions";
import Countdown_list from "./Countdown_list";

interface Main_screen_props {}

const Main_screen: FC<Main_screen_props> = () => {
  return (
    <EuiPageBody
      paddingSize="s"
      panelled={true}
      grow={true}
      style={{ maxHeight: "100vh" }}
    >
      <EuiPageSection paddingSize="xs" grow={false} color="transparent">
        <EuiPanel paddingSize="xs" hasShadow>
          {/* <Header_actions navigation={navigation} /> */}
        </EuiPanel>
      </EuiPageSection>

      <EuiPageSection
        paddingSize="xs"
        grow={true}
        color="transparent"
        style={{ overflowY: "scroll", scrollbarWidth: "thin" }}
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
