import React from "react";
import { DatePicker as AntDatePicker, ConfigProvider } from "antd";
import moment from "moment";
import { RangeValue } from "../../../../node_modules/rc-picker/lib/interface";
import { dateRange, period } from "../../../shared/types";
const { RangePicker } = AntDatePicker;

interface DatePickerProps {
  selectDate: (dateRange: dateRange, index: number) => void;
  period: period;
  index: number;
}

export const DatePicker: React.FC<DatePickerProps> = props => {
  const { selectDate, index } = props;

  function onChange(dates: RangeValue<moment.Moment>, dateStrings: dateRange) {
    selectDate(dateStrings, index);
    console.log(dateStrings);
  }

  return (
    <ConfigProvider>
      <RangePicker
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")]
        }}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};
