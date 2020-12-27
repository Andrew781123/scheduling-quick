export type dateRange = [string, string];

export type timeRange = [string, string];

export type TimeSlot = [string, string, string[]];

export interface period {
  dateRange: dateRange;
  timeRange: timeRange;
}

export interface TimeAvailable {
  [key: string]: TimeSlot[];
}

export interface participant {
  name: string;
  timeAvailable: TimeAvailable;
}

export type CommmonAvailable = TimeAvailable | null;

export interface EventDuration {
  durationHour: EventMinDurationHour;
  durationMin: EventMinDurationMin;
}

export type CommonByPeopleElement = [string, number];

export interface CommonAvailableCategory {
  [key: number]: CommonByPeopleElement[];
}

export interface IEvent {
  info: {
    organizer: string;
    venue: {
      name?: string;
      googleMapLink?: string;
    };
  };
  duration: EventDuration;

  periods: period[];

  participants: participant[];

  commonAvailableCategory?: CommonAvailableCategory;

  commonAvailable: CommmonAvailable;

  linkPassword?: string;

  authPassword?: string;
}

//constants
export type EventMinDurationHour = number;
export type EventMinDurationMin = number;

//backend
export type queryString = { key: "type"; value: "common" | "all" };

export type getEventResponse = { _id: string } & Omit<
  IEvent,
  "linkPassword" | "authPassword"
>;
