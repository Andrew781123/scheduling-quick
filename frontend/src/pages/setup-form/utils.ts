import { periodState, period } from "./types";

export const formatPeriods = (periods: periodState[]): period[] => {
  const formattedPeriods: period[] = [];

  periods.forEach(period => {
    const {
      dateRange: { fromDate, toDate },
      timeRange: { fromTime, toTime }
    } = period;

    const fromDateString: string = fromDate!.format("DD-MM-YYYY");
    const toDateString: string = toDate!.format("DD-MM-YYYY");

    const fromTimeNumber: number = +fromTime!.format("HHmm");
    const toTimeNumber: number = +toTime!.format("HHmm");

    const formattedPeriod: period = {
      dateRange: [fromDateString, toDateString],
      timeRange: [fromTimeNumber, toTimeNumber]
    };

    formattedPeriods.push(formattedPeriod);
  });

  return formattedPeriods;
};
