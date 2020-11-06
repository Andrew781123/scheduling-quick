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

//backend
export type dateRange = [string, string];

export type timeRange = [number, number];

export type TimeSlot = [string, string, string[]];

export interface period {
  dateRange: dateRange;
  timeRange: timeRange;
}

export interface IEvent {
  info: {
    organizer: string;
    venue: {
      name?: string;
      googleMapLink?: string;
    };
  };

  periods: period[];

  participants?: {
    name: string;
    timeAvailable: Map<string, TimeSlot>;
  };

  commonDate?: Map<string, TimeSlot>;

  linkPassword?: string;

  authPassword?: string;
}
