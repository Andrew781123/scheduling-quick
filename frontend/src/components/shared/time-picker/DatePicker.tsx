import React, { useMemo } from "react";
import { DatePicker as AntDatePicker, ConfigProvider } from "antd";
import moment from "moment";
import { RangeValue } from "../../../../node_modules/rc-picker/lib/interface";
import { dateRange } from "../../../shared/types";
const { RangePicker } = AntDatePicker;

interface DatePickerProps {
  selectDate: (dateRange: dateRange, index: number) => void;
  dateRange: dateRange;
  index: number;
}

type dateRangeMoment = [moment.Moment, moment.Moment];

export const DatePicker: React.FC<DatePickerProps> = props => {
  const { selectDate, index, dateRange } = props;

  function onChange(dates: RangeValue<moment.Moment>, dateStrings: dateRange) {
    selectDate(dateStrings, index);
  }

  const dateRangeMoment: dateRangeMoment = useMemo(() => {
    return [moment(dateRange[0]), moment(dateRange[1])];
  }, [dateRange]);

  const disabledDate = (currentDate: moment.Moment) => {
    return currentDate < moment();
  };

  return (
    <ConfigProvider>
      <RangePicker
        inputReadOnly={true}
        disabledDate={disabledDate}
        defaultValue={dateRangeMoment}
        ranges={{
          Today: [moment(), moment()],
          "This Month": [moment().startOf("month"), moment().endOf("month")]
        }}
        onChange={onChange}
      />
    </ConfigProvider>
  );
};
