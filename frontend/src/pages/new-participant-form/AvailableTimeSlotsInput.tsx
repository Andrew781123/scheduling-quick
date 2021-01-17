import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Switch
} from "@material-ui/core";
import { Moment } from "moment";
import React, { useState } from "react";
import { TimePickers } from "./TimePickers";
import {
  DateAndTimeInput,
  DateRangeState,
  SelectedDateMap,
  timeSlot
} from "./types";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteIconWithCondition } from "../../components/shared/DeleteIconWithCondition";
import { DatePickers } from "./DatePickers";
import { switchStyles } from "./Styles";
import { DATE_STRING } from "../../shared/constants";

interface AvailableTimeSlotsInputProps {
  minDate: Moment;
  maxDate: Moment;
  dateAndTimeInputLength: number;
  dateAndTimeInput: DateAndTimeInput;
  dateIndex: number;
  selectDate: (
    date: Moment,
    dateIndex: number,
    dateRangeField: keyof DateRangeState
  ) => void;
  enableRange: (dateIndex: number, newToDate: Moment) => void;
  disableRange: (dateIndex: number) => void;
  selectTime: (
    timeField: keyof timeSlot,
    time: Moment | null,
    dateIndex: number,
    timeIndex: number
  ) => void;
  autoSetToTime: (
    fromTime: Moment,
    dateIndex: number,
    timeIndex: number
  ) => void;
  addTimeSlot: (dateIndex: number) => void;
  deleteDateAndTimeInput: (dateIndex: number) => void;
  deleteTimeSlot: (dateIndex: number, timeSlotIndex: number) => void;
  selectedDatesMap: SelectedDateMap;
  addOrRemoveKeyFromSelectedDateMap: (date: Moment, doAdd: boolean) => void;
  pushErrors: (newErrors: string[]) => void;
}

export const AvailableTimeSlotsInput: React.FC<AvailableTimeSlotsInputProps> = props => {
  const {
    minDate,
    maxDate,
    dateAndTimeInputLength,
    dateAndTimeInput,
    dateIndex,
    selectDate,
    enableRange,
    disableRange,
    selectTime,
    autoSetToTime,
    addTimeSlot,
    deleteDateAndTimeInput,
    deleteTimeSlot,
    selectedDatesMap,
    addOrRemoveKeyFromSelectedDateMap,
    pushErrors
  } = props;

  const [arePeriodFieldsValid, setArePeriodFieldsValid] = useState({
    timeSlots: true,
    dateRange: true
  });

  const { dateRange, timeSlots } = dateAndTimeInput;

  const validatePeriod = (
    periodField: keyof DateAndTimeInput,
    data: Moment,
    isFromField: boolean,
    timeIndex?: number
  ) => {
    // let errorMessage: FormErrors | undefined;
    // //validate data or time
    // if (periodField === "dateRange") {
    //   (errorMessage as "Invalid date range" | undefined) = validateDateRange({
    //     fromDate: isFromField ? data : period[periodField]["fromDate"],
    //     toDate: !isFromField ? data : period[periodField]["toDate"]
    //   });
    // } else {
    //   (errorMessage as "Invalid time range" | undefined) = validateTimeRange({
    //     fromTime: isFromField ? data : period[periodField]["fromTime"],
    //     toTime: !isFromField ? data : period[periodField]["toTime"]
    //   });
    // }
    // //toggle isValid
    // if (
    //   (errorMessage && arePeriodFieldsValid[periodField]) ||
    //   (!errorMessage && !arePeriodFieldsValid[periodField])
    // ) {
    //   setArePeriodFieldsValid(fields => ({
    //     ...fields,
    //     [periodField]: !fields[periodField]
    //   }));
    // }
  };

  const handleFromDateSelect = (date: Moment | null) => {
    //remove old from date from map and add the new one
    addOrRemoveKeyFromSelectedDateMap(dateRange.fromDate!, false);

    addOrRemoveKeyFromSelectedDateMap(date!, true);

    selectDate(date!, dateIndex, "fromDate");
  };

  const handleToDateSelect = (date: Moment | null) => {
    //remove old to date from map and add the new one
    addOrRemoveKeyFromSelectedDateMap(dateRange.toDate!, false);

    let dateToBeAdded: Moment = date!.clone();

    while (dateToBeAdded.diff(dateRange.fromDate, "days") >= 0) {
      addOrRemoveKeyFromSelectedDateMap(dateToBeAdded, true);

      dateToBeAdded.subtract(1, "day");
    }

    selectDate(date!, dateIndex, "toDate");
  };

  const toggleEnableRange = () => {
    if (dateRange.isRange) {
      addOrRemoveKeyFromSelectedDateMap(dateRange.toDate!, false);
      disableRange(dateIndex);
    } else {
      const fromDateCopy = dateRange.fromDate!.clone();
      const newToDate = fromDateCopy.add(1, "day");

      const newToDateString = newToDate.format(DATE_STRING);
      if (selectedDatesMap[newToDateString] || newToDate.diff(maxDate) > 0)
        return pushErrors(["Cannot set range"]);

      addOrRemoveKeyFromSelectedDateMap(newToDate, true);

      enableRange(dateIndex, newToDate);
    }
  };

  const styleClasses = switchStyles();

  return (
    <>
      <div className='date_input'>
        <DeleteIconWithCondition componentLength={dateAndTimeInputLength}>
          <IconButton
            onClick={() => deleteDateAndTimeInput(dateIndex)}
            style={cancelIconStyle}
            size='small'
          >
            <CancelIcon fontSize='small' />
          </IconButton>
        </DeleteIconWithCondition>

        <h3 className='label'>Date</h3>
        <FormControlLabel
          control={
            <Switch
              checked={dateRange.isRange}
              onChange={toggleEnableRange}
              name='checkedB'
              color='primary'
              size='small'
            />
          }
          label='Range'
          labelPlacement='start'
          classes={{
            root: styleClasses.root,
            label: styleClasses.label
          }}
        />
        <DatePickers
          minDate={minDate}
          maxDate={maxDate}
          dateRange={dateRange}
          handleFromDateSelect={handleFromDateSelect}
          handleToDateSelect={handleToDateSelect}
        />
      </div>
      <Divider />
      <div className='time_range_input '>
        <h3 className='label'>Time slots</h3>
        {timeSlots.map((timeSlot, i) => (
          <div className='time_pickers' key={i}>
            <h4 className='index'>#{i + 1}</h4>
            <DeleteIconWithCondition componentLength={timeSlots.length}>
              <IconButton
                onClick={() => deleteTimeSlot(dateIndex, i)}
                style={deleteButtonStyle}
                size='small'
              >
                <DeleteIcon fontSize='small' />
              </IconButton>
            </DeleteIconWithCondition>

            <TimePickers
              key={i}
              timeSlot={timeSlot}
              dateIndex={dateIndex}
              timeSlotIndex={i}
              handleTimeSelect={selectTime}
              validatePeriod={validatePeriod}
              autoSetToTime={autoSetToTime}
            />
          </div>
        ))}
        <div className='add_one_time_slot_button'>
          <Button
            variant='contained'
            onClick={() => addTimeSlot(dateIndex)}
            className={"Button"}
          >
            Add one time slot
          </Button>
        </div>
      </div>
    </>
  );
};

const cancelIconStyle: React.CSSProperties = {
  position: "absolute",
  top: "0",
  right: "0px"
};

const deleteButtonStyle: React.CSSProperties = {
  position: "absolute",
  top: "3px",
  right: "5px"
};
