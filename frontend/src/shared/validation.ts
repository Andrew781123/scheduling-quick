import { timeRangeState, dateRangeState } from "../pages/setup-form/types";

export type invalidTimeRangeErrorMessage =
  | "Invalid time range"
  | "Invalid date range";

export const validateTimeRange = (timeRange: timeRangeState) => {
  const { fromTime, toTime } = timeRange;

  const errorMessage: invalidTimeRangeErrorMessage = "Invalid time range";

  if (toTime!.diff(fromTime) <= 0) {
    return errorMessage;
  }
};

export const validateDateRange = (dateRange: dateRangeState) => {
  const { fromDate, toDate } = dateRange;

  const errorMessage: invalidTimeRangeErrorMessage = "Invalid date range";

  if (toDate!.diff(fromDate) < 0) {
    return errorMessage;
  }
};

export const validateNameInput = (name: string) => {
  //check if contains string
  if (name.trim().length === 0) return "Name cannot be empty";

  if (/\s/.test(name)) return "Name should not contain empty space";

  if (name.length > 15) return "Name should not be longer than 15 characters";
};
