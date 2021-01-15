import {
  Button,
  Divider,
  FormControlLabel,
  IconButton,
  Switch
} from "@material-ui/core";
import { Moment } from "moment";
import React from "react";
import { period } from "../../../../types";
import { TimePickers } from "./TimePickers";
import { DateAndTimeInput, DateRangeState, timeSlot } from "./types";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteIconWithCondition } from "../../components/shared/DeleteIconWithCondition";
import { DatePickers } from "./DatePickers";
import { switchStyles } from "./Styles";

interface AvailableTimeSlotsInputProps {
  periods: period[];
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
  enableRange: (dateIndex: number, fromDate: Moment) => void;
  disableRange: (dateIndex: number) => void;
  selectTime: (
    timeField: keyof timeSlot,
    time: Moment | null,
    dateIndex: number,
    timeIndex: number
  ) => void;
  addTimeSlot: (dateIndex: number) => void;
  deleteDateAndTimeInput: (dateIndex: number) => void;
  deleteTimeSlot: (dateIndex: number, timeSlotIndex: number) => void;
}

export const AvailableTimeSlotsInput: React.FC<AvailableTimeSlotsInputProps> = props => {
  const {
    periods,
    minDate,
    maxDate,
    dateAndTimeInputLength,
    dateAndTimeInput,
    dateIndex,
    selectDate,
    enableRange,
    disableRange,
    selectTime,
    addTimeSlot,
    deleteDateAndTimeInput,
    deleteTimeSlot
  } = props;

  const { dateRange, timeSlots } = dateAndTimeInput;

  const handleFromDateSelect = (date: Moment | null) => {
    selectDate(date!, dateIndex, "fromDate");
  };

  const handleToDateSelect = (date: Moment | null) => {
    selectDate(date!, dateIndex, "toDate");
  };

  const toggleEnableRange = () => {
    if (dateRange.isRange) disableRange(dateIndex);
    else enableRange(dateIndex, dateRange.fromDate!);
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
