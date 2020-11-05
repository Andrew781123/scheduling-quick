import React, { useMemo } from "react";
import { DatePicker as AntDatePicker, ConfigProvider } from "antd";
import moment, { Moment } from "moment";
import { RangeValue } from "../../../../node_modules/rc-picker/lib/interface";
import { dateRange } from "../../../shared/types";
import { DatePicker as MaterialDatePicker } from "@material-ui/pickers";
import { dateRangeState } from "../../../pages/setup-form/types";

interface DatePickerProps {
  selectDate: (dateField: string, date: Moment, index: number) => void;
  dateRange: dateRangeState;
  index: number;
}

type dateRangeMoment = [moment.Moment, moment.Moment];

export const DatePicker: React.FC<DatePickerProps> = props => {
  const { selectDate, index, dateRange } = props;

  const handleFromDateSelect = (date: Moment | null) => {
    console.log(index);
    selectDate("fromDate", date!, index);
  };

  const handleToDateSelect = (date: Moment | null) => {
    selectDate("toDate", date!, index);
  };

  return (
    <>
      <MaterialDatePicker
        onChange={handleFromDateSelect}
        value={dateRange.fromDate}
        disablePast={true}
      ></MaterialDatePicker>
      <MaterialDatePicker
        onChange={handleToDateSelect}
        value={dateRange.toDate}
        disablePast={true}
      ></MaterialDatePicker>
    </>
  );
};
