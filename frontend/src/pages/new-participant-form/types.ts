import { Moment } from "moment";

export type queryString = "form" | "dashboard";

export type AvailableTimeSlot = {
  date: Moment | null;
  fromTime: Moment | null;
  toTime: Moment | null;
};

export type NewParticipantAvailableTimeSlotsState = AvailableTimeSlot[];
