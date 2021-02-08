import { Moment } from "moment";
import { EventMinDurationHour, EventMinDurationMin } from "../../../../types";
import { NameInputErrors } from "../../shared/types";

export interface dateRangeState {
  fromDate: Moment | null;
  toDate: Moment | null;
}

export interface timeRangeState {
  fromTime: Moment | null;
  toTime: Moment | null;
}

export interface periodState {
  dateRange: dateRangeState;
  timeRange: timeRangeState;
}

export interface EventDuration {
  durationHour: EventMinDurationHour;
  durationMin: EventMinDurationMin;
}

export interface setupInfoTextFields {
  organizerName: string;
  venue: string;
  duration: EventDuration;
  linkPassword: string;
  authPassword: string;
  loading: boolean;
}

export interface setupInfoDateAndTimeFields {
  periods: periodState[];
}

export type setupInfo = setupInfoDateAndTimeFields & setupInfoTextFields;

export type DateOrTime = "date" | "time";

//backend
