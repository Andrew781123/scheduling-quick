export type dateRange = [string, string];

export type timeRange = [string, string];

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

  participants: {
    name: string;
    timeAvailable: Map<string, TimeSlot>;
  }[];

  commonDate: Map<string, TimeSlot> | null;

  linkPassword?: string;

  authPassword?: string;
}

//backend
export type queryString = { key: "type"; value: "form" | "dashboard" };

export type getEventResponse = Omit<IEvent, "linkPassword" | "authPassword">;
