import {
  EuiForm,
  EuiFormRow,
  EuiButton,
  EuiPageTemplate,
  EuiHorizontalRule,
} from "@elastic/eui";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import moment from "moment";
import React, { FC } from "react";
import { root_stack_param_list } from "../../../App";
import use_database_store from "../../store/database/use_database_store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Goal_form, Goal_form_inputs } from "./schema";
import { joiResolver } from "@hookform/resolvers/joi";
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";

export interface Countdown_goal_form_props
  extends NativeStackScreenProps<root_stack_param_list, "Goal_form"> {}

const Countdown_goal_form: FC<Countdown_goal_form_props> = ({
  route,
  navigation,
}) => {
  const edit_item = route.params?.edit_item;
  const default_values = edit_item
    ? {
        name: edit_item.name,
        end_date: moment(edit_item.end_date),
      }
    : {
        name: "",
        end_date: moment(),
      };

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Goal_form_inputs>({
    resolver: joiResolver(Goal_form),
    defaultValues: default_values,
  });

  const { add_goal, edit_goal } = use_database_store();

  const on_submit_handler: SubmitHandler<Goal_form_inputs> = (form_inputs) => {
    if (edit_item) {
      edit_goal({
        id: edit_item.id,
        start_date: edit_item.start_date,
        name: form_inputs.name,
        end_date: form_inputs.end_date.toString(),
      });
    } else {
      add_goal({
        ...form_inputs,
        start_date: moment(),
      });
    }
    navigation.navigate("Main_screen");
  };

  console.debug(errors);

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        <EuiForm component="form" onSubmit={handleSubmit(on_submit_handler)}>
          <EuiFormRow isInvalid={!!errors.name} error={errors.name?.message}>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <TextField
                  label="Name"
                  required={true}
                  variant="standard"
                  {...field}
                />
              )}
            />
          </EuiFormRow>

          <EuiHorizontalRule />

          <EuiFormRow>
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <StaticDateTimePicker
                  value={field.value}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                    }
                  }}
                  slots={{
                    actionBar: () => <></>,
                  }}
                />
              )}
            />
          </EuiFormRow>

          <EuiFormRow>
            <EuiButton disabled={!isValid} type="submit">
              {edit_item ? "Edit" : "Add"}
            </EuiButton>
          </EuiFormRow>
        </EuiForm>
      </EuiPageTemplate.Section>
    </EuiPageTemplate>
  );
};

export default Countdown_goal_form;
