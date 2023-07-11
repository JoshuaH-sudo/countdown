import {
  EuiForm,
  EuiFormRow,
  EuiDatePicker,
  EuiButton,
  EuiFieldText,
  EuiPageTemplate,
} from "@elastic/eui";
import moment from "moment";
import React, { FC } from "react";
import use_database_store from "../../store/database/use_database_store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Goal_form, Goal_form_inputs } from "./schema";
import { joiResolver } from "@hookform/resolvers/joi";

export interface Countdown_goal_form_props {}
const Countdown_goal_form: FC<Countdown_goal_form_props> = () => {
  const edit_item = {
    id: "Dadf",
    name: "dd",
    end_date: moment(),
    start_date: moment().toString(),
  }; //route.params?.edit_item;
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
    // navigation.navigate("Main_screen");
  };

  console.debug(errors);

  return (
    <EuiPageTemplate panelled={true} restrictWidth={true} grow={true}>
      <EuiPageTemplate.Section grow={false} color="subdued">
        <EuiForm component="form" onSubmit={handleSubmit(on_submit_handler)}>
          <EuiFormRow
            label="Name"
            isInvalid={!!errors.name}
            error={errors.name?.message}
          >
            <Controller
              name="name"
              control={control}
              render={({ field }) => <EuiFieldText {...field} />}
            />
          </EuiFormRow>

          <EuiFormRow label="Select an end date">
            <Controller
              name="end_date"
              control={control}
              render={({ field }) => (
                <EuiDatePicker
                  name={field.name}
                  onBlur={field.onBlur}
                  inputRef={field.ref}
                  showTimeSelect
                  selected={field.value}
                  onChange={(date) => {
                    if (date) {
                      field.onChange(date);
                    }
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
