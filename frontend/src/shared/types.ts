export type dateRange = [string, string];

export type timeRange = [number, number];

export type TimeSlot = [string, string, string[]];

export interface period {
  dateRange: dateRange;
  timeRange: timeRange;
}
