import moment from "moment";

export interface Countdown_goal {
    name: string;
    end_date: moment.Moment;
}

export interface Serialized_countdown_goal {
    name: string
    end_date: string;
  }