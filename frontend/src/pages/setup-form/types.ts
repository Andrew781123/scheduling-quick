import { Moment } from "moment";
import { timeRange } from "../../shared/types";

export interface dateRangeState {
  fromDate: Moment | null;
  toDate: Moment | null;
}

export interface timeRangeState {
  fromTime: string;
  toTime: string;
}

export interface periodState {
  dateRange: dateRangeState;
  timeRange: timeRange;
}

export interface setupInfo {
  organizerName: string;
  periods: periodState[];
}
