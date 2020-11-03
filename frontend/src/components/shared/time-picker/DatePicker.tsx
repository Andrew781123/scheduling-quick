import React from "react";
import { DatePicker as AntDatePicker, ConfigProvider } from "antd";
import moment from "moment";
import { RangeValue } from "../../../../node_modules/rc-picker/lib/interface";
const { RangePicker } = AntDatePicker;

interface DatePickerProps {
  handleDateSelect: (selectedDate: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = props => {
  const { handleDateSelect } = props;

  function onChange(
    dates: RangeValue<moment.Moment>,
    dateStrings: [string, string]
  ) {
    handleDateSelect(dateStrings[0]);
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
