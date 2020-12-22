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

export interface IEvent {
  info: {
    organizer: string;
    venue: {
      name?: string;
      googleMapLink?: string;
    };
  };

  periods: period[];

  participants: participant[];

  commonAvailable: CommmonAvailable;

  linkPassword?: string;

  authPassword?: string;
}

//backend
export type queryString = { key: "type"; value: "common" | "all" };

export type getEventResponse = { _id: string } & Omit<
  IEvent,
  "linkPassword" | "authPassword"
>;
