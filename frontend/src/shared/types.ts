export type dateRange = [string, string];

export type timeRange = [number, number];

export type TimeSlot = [number, number, string[]];

export interface period {
  dateRange: dateRange;
  timeRange: timeRange;
}
