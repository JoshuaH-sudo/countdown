import { EuiPageTemplate } from "@elastic/eui";
import AsyncStorage from "@react-native-async-storage/async-storage";
import moment from "moment";
import React, { useState, useEffect } from "react";
import Countdown_display from "../Countdown_display";
import use_database_store from "../store/database/use_database_store";

export function Main_screen() {
  const { database } = use_database_store(); 
  const { countdown_goals } = database

  const countdown_list = countdown_goals.map((countdown_goal) => (
    <EuiPageTemplate.Section grow={false} color="subdued">
      <Countdown_display
        goal_name={countdown_goal.name}
        end_date={moment(countdown_goal.end_date)}
      />
    </EuiPageTemplate.Section>
  ));

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        {countdown_list}
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
}
