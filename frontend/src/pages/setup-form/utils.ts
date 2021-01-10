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

export const validateInputOnSubmit = (name: string) => {
  const errors: FormErrors[] = [];

  if (name.length === 0 || name.trim().length === 0) {
    errors.push("Name can't be empty");
  }

  return errors;
};
