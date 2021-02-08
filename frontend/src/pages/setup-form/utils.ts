import { periodState } from "./types";
import { period } from "../../../../types";
import { TIME_STRING, DATE_STRING } from "../../shared/constants";
import { validateNameInput } from "../../shared/validation";

export const formatPeriods = (periods: periodState[]): period[] => {
  const formattedPeriods: period[] = [];

  periods.forEach(period => {
    const {
      dateRange: { fromDate, toDate },
      timeRange: { fromTime, toTime }
    } = period;

    const fromDateString: string = fromDate!.format(DATE_STRING);
    const toDateString: string = toDate!.format(DATE_STRING);

    const fromTimeString: string = fromTime!.format(TIME_STRING);
    const toTimeString: string = toTime!.format(TIME_STRING);

    const formattedPeriod: period = {
      dateRange: [fromDateString, toDateString],
      timeRange: [fromTimeString, toTimeString]
    };

    formattedPeriods.push(formattedPeriod);
  });

  return formattedPeriods;
};

export const validateInputOnSubmit = (
  name: string,
  arePeriodFieldsValid: { timeRange: boolean; dateRange: boolean },
  onBlurErrors: {
    [key: string]: string | null;
  }
) => {
  const errors: string[] = [];

  const nameError = validateNameInput(name);

  if (nameError) errors.push(nameError);

  if (!arePeriodFieldsValid.timeRange) errors.push("Invalid time-slot input");

  if (!arePeriodFieldsValid.dateRange) errors.push("Invalid date input");

  for (const inputName in onBlurErrors) {
    if (onBlurErrors[inputName]) errors.push("There are invalid inputs");
  }

  return errors;
};
