import "@elastic/eui/dist/eui_theme_dark.css";
import React, { useEffect, useState } from "react";
import {
  EuiPageTemplate,
  EuiProvider,
  EuiForm,
  EuiDatePicker,
  EuiFormRow,
} from "@elastic/eui";
import moment from "moment";
import Countdown_display from "./components/Countdown_display";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const item_id = "main";
  const storage_name = `${item_id}-end-date`;
  const [end_date, set_end_date] = useState<moment.Moment>(moment());

  const handle_change = (date: moment.Moment) => {
    set_end_date(date);
    store_end_date(date)
  };

  const store_end_date = async (date: moment.Moment) => {
    await AsyncStorage.setItem(storage_name, JSON.stringify(date));
  };

  const init_end_date = async () => {
    const end_date_store = await AsyncStorage.getItem(storage_name);
    if (!end_date_store) {
      console.debug("no end date in storage");
      set_end_date(moment());
      return;
    }

    const stored_end_date = moment(JSON.parse(end_date_store));
    console.debug("Returned end-date", end_date_store, stored_end_date);
    set_end_date(stored_end_date);
  };

  useEffect(() => {
    init_end_date();
  }, []);

  return (
    <EuiProvider colorMode="dark">
      <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
        <EuiPageTemplate.Section grow={false} color="subdued">
          <EuiForm>
            <EuiFormRow label="Select a date">
              <EuiDatePicker
                showTimeSelect
                selected={end_date}
                onChange={handle_change}
              />
            </EuiFormRow>
            <EuiFormRow label="Countdown">
              <Countdown_display end_date={end_date} item_id={item_id} />
            </EuiFormRow>
          </EuiForm>
        </EuiPageTemplate.Section>
      </EuiPageTemplate>
    </EuiProvider>
  );
}
