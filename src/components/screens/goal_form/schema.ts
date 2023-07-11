import Joi from "joi";

export interface Goal_form_inputs {
  name: string;
  end_date: moment.Moment;
}

export const Goal_form = Joi.object<Goal_form_inputs>({
  name: Joi.string().required(),
  end_date: Joi.object().required(),
});
