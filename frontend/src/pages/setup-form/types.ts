import { Moment } from "moment";
import { EventMinDurationHour, EventMinDurationMin } from "../../../../types";

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
  duration: EventDuration
  linkPassword: string;
  authPassword: string;
}

export interface setupInfoDateAndTimeFields {
  periods: periodState[];
}

export type setupInfo = setupInfoDateAndTimeFields & setupInfoTextFields;

//backend
