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
    dateRangeField: keyof DateRangeState<Moment>
  ) => void;
  enableRange: (dateIndex: number, newToDate: Moment) => void;
  disableRange: (dateIndex: number, fromDate: Moment) => void;
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
  autoSetToDate: (fromDate: Moment, dateIndex: number) => void;
  addTimeSlot: (dateIndex: number) => void;
  deleteDateAndTimeInput: (dateIndex: number) => void;
  deleteTimeSlot: (dateIndex: number, timeSlotIndex: number) => void;
  selectedDatesMap: SelectedDateMap;
  addOrRemoveKeyFromSelectedDateMap: (
    dateRange: [Moment, Moment],
    doAdd: boolean,
    inclusive: [boolean, boolean]
  ) => void;
  pushErrors: (newErrors: string[]) => void;
  setIsDateValid: (dateIndex: number, isValid: boolean) => void;
  setIsTimeSlotValid: (
    dateIndex: number,
    timeSlotIndex: number,
    isValid: boolean
  ) => void;
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
    autoSetToDate,
    addTimeSlot,
    deleteDateAndTimeInput,
    deleteTimeSlot,
    selectedDatesMap,
    addOrRemoveKeyFromSelectedDateMap,
    pushErrors,
    setIsDateValid,
    setIsTimeSlotValid
  } = props;

  const [arePeriodFieldsValid, setArePeriodFieldsValid] = useState({
    timeSlots: true,
    dateRange: true
  });

  const { dateRange, timeSlots } = dateAndTimeInput;

  const handleFromDateSelect = (date: Moment | null) => {
    //include start, exclude end
    if (dateRange.isRange) {
      //new date > old date => remove (old -> new)
      //new date < old date => add (new -> old)
      const isNewDateBigger = date!.diff(dateRange.fromDate, "days") > 0;

      const dateRangeToAddOrRemove: [Moment, Moment] = isNewDateBigger
        ? [dateRange.fromDate!, date!]
        : [date!, dateRange.fromDate!];

      const doAdd = !isNewDateBigger;

      addOrRemoveKeyFromSelectedDateMap(dateRangeToAddOrRemove, doAdd, [
        true,
        false
      ]);
    } else {
      addOrRemoveKeyFromSelectedDateMap(
        [dateRange.fromDate!, dateRange.fromDate!],
        false,
        [true, true]
      );
      addOrRemoveKeyFromSelectedDateMap([date!, date!], true, [true, true]);
    }

    selectDate(date!, dateIndex, "fromDate");
  };

  const handleToDateSelect = (date: Moment | null) => {
    //exclude start, include end
    if (dateRange.isRange) {
      //new date > old date => add (old -> new)
      //new date < old date => remove (new -> old)
      const isNewDateBigger = date!.diff(dateRange.toDate, "days") > 0;

      const dateRangeToAddOrRemove: [Moment, Moment] = isNewDateBigger
        ? [dateRange.toDate!, date!]
        : [date!, dateRange.toDate!];

      const doAdd = isNewDateBigger;

      addOrRemoveKeyFromSelectedDateMap(dateRangeToAddOrRemove, doAdd, [
        false,
        true
      ]);
    } else {
      addOrRemoveKeyFromSelectedDateMap(
        [dateRange.toDate!, dateRange.toDate!],
        false,
        [true, true]
      );
      addOrRemoveKeyFromSelectedDateMap([date!, date!], true, [true, true]);
    }

    selectDate(date!, dateIndex, "toDate");
  };

  const handleDeleteDateAndTimeInput = () => {
    addOrRemoveKeyFromSelectedDateMap(
      [dateRange.fromDate!, dateRange.toDate!],
      false,
      [true, true]
    );

    deleteDateAndTimeInput(dateIndex);
  };

  const toggleEnableRange = () => {
    if (dateRange.isRange) {
      //clear date input error if exists
      setIsDateValid(dateIndex, true);

      addOrRemoveKeyFromSelectedDateMap(
        [dateRange.fromDate!, dateRange.toDate!],
        false,
        [false, true]
      );

      disableRange(dateIndex, dateRange.fromDate!);
    } else {
      const fromDateCopy = dateRange.fromDate!.clone();
      const newToDate = fromDateCopy.add(1, "day");

      const newToDateString = newToDate.format(DATE_STRING);

      if (selectedDatesMap[newToDateString] || newToDate.diff(maxDate) > 0)
        return pushErrors(["Cannot set range"]);

      addOrRemoveKeyFromSelectedDateMap([newToDate, newToDate], true, [
        true,
        true
      ]);

      enableRange(dateIndex, newToDate);
    }
  };

  const styleClasses = switchStyles();

  return (
    <>
      <div className='date_input'>
        <DeleteIconWithCondition componentLength={dateAndTimeInputLength}>
          <IconButton
            onClick={handleDeleteDateAndTimeInput}
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
          dateIndex={dateIndex}
          minDate={minDate}
          maxDate={maxDate}
          dateRange={dateRange}
          handleFromDateSelect={handleFromDateSelect}
          handleToDateSelect={handleToDateSelect}
          autoSetToDate={autoSetToDate}
          setIsDateValid={setIsDateValid}
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
              autoSetToTime={autoSetToTime}
              setIsTimeSlotValid={setIsTimeSlotValid}
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
