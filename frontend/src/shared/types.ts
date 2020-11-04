export type dateRange = [string, string];

export type timeRange = [string, string];

export type TimeSlot = [string, string, string[]];

export interface period {
  dateRange: dateRange;
  timeRange: timeRange;
}
