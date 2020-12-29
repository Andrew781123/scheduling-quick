import { Moment } from "moment";
import { EventDuration, period } from "../../../../types";

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

export interface EventInfo {
  venue: string;
  organizer: string;
  evnetPossibleDataAndTime: period[];
  participantCount: number;
  eventDuration: EventDuration;
}
