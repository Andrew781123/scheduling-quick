import { FormErrors, periodState } from "./types";
import { period } from "../../../../types";
import { TIME_STRING, DATE_STRING } from "../../shared/constants";

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

export const validateNameInput = (name: string) => {
  //check if contains string
  if (/\s/.test(name)) return "Name should not contain empty space";

  if (name.length > 20) return "Name should not be longer than 20 characters";
};

export const validateInputOnSubmit = (
  name: string,
  arePeriodFieldsValid: { timeRange: boolean; dateRange: boolean },
  onBlurErrors: {
    [key: string]: string | null;
  }
) => {
  const errors: FormErrors[] = [];

  if (name.length === 0 || name.trim().length === 0) {
    errors.push("Name can't be empty");
  }

  if (!arePeriodFieldsValid.timeRange) errors.push("Invalid time-slot input");

  if (!arePeriodFieldsValid.dateRange) errors.push("Invalid date input");

  for (const inputName in onBlurErrors) {
    if (onBlurErrors[inputName]) errors.push("There are invalid inputs");
  }

  return errors;
};
