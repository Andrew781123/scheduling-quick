import { Moment } from "moment";

export type queryString = "form" | "dashboard";

export interface timeSlot {
  fromTime: Moment | null;
  toTime: Moment | null;
}

export type DateAndTimeInput = {
  date: Moment | null;
  timeSlots: timeSlot[];
};

export type NewParticipantDateAndTimeInput = DateAndTimeInput[];
