import { periodState } from "./types";
import { period } from "../../../../types";

export const formatPeriods = (periods: periodState[]): period[] => {
  const formattedPeriods: period[] = [];

  periods.forEach(period => {
    const {
      dateRange: { fromDate, toDate },
      timeRange: { fromTime, toTime }
    } = period;

    const fromDateString: string = fromDate!.format("DD-MM-YYYY");
    const toDateString: string = toDate!.format("DD-MM-YYYY");

    const fromTimeString: string = fromTime!.format("HHmm");
    const toTimeString: string = toTime!.format("HHmm");

    const formattedPeriod: period = {
      dateRange: [fromDateString, toDateString],
      timeRange: [fromTimeString, toTimeString]
    };

    formattedPeriods.push(formattedPeriod);
  });

  return formattedPeriods;
};
