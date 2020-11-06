import { Moment } from "moment";

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

export interface setupInfoTextFields {
  organizerName: string;
  venue: string;
  linkPassword: string;
  authPassword: string;
}

export interface setupInfoDateAndTimeFields {
  periods: periodState[];
}

export type setupInfo = setupInfoDateAndTimeFields & setupInfoTextFields;
