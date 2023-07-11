import moment from "moment";

export interface Base_countdown_goal {
  id: string;
  name: string;
}

//For displaying and use
export interface Countdown_goal extends Base_countdown_goal {
  end_date: moment.Moment;
  start_date: moment.Moment;
}

export interface New_countdown_goal extends Omit<Countdown_goal, "id"> {
  name: string;
}

//For storing in redux and database
export interface Serialized_countdown_goal extends Base_countdown_goal {
  end_date: string;
  start_date: string;
}
