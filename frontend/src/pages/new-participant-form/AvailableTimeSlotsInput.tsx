import { Button, Divider, IconButton } from "@material-ui/core";
import { DatePicker } from "@material-ui/pickers";
import moment, { Moment } from "moment";
import React, { useMemo } from "react";
import { period } from "../../../../types";
import { DATE_STRING } from "../../shared/constants";
import { TimePickers } from "./TimePickers";
import { DateAndTimeInput, timeSlot } from "./types";
import CancelIcon from "@material-ui/icons/Cancel";
import DeleteIcon from "@material-ui/icons/Delete";
import { DeleteIconWithCondition } from "../../components/shared/DeleteIconWithCondition";

interface AvailableTimeSlotsInputProps {
  periods: period[];
  dateAndTimeInputLength: number;
  dateAndTimeInput: DateAndTimeInput;
  dateIndex: number;
  selectDate: (date: Moment, dateIndex: number) => void;
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
    dateAndTimeInputLength,
    dateAndTimeInput,
    dateIndex,
    selectDate,
    selectTime,
    addTimeSlot,
    deleteDateAndTimeInput,
    deleteTimeSlot
  } = props;

  const { date, timeSlots } = dateAndTimeInput;

  const handleDateSelect = (date: Moment | null) => {
    selectDate(date!, dateIndex);
  };

  //Only enable dates within the event period
  const [minDate, maxDate] = useMemo(() => {
    //not sure why length of periods is zero in first few renders
    if (periods.length === 0) return [moment(), moment()];

    //min date must be the day when filling the form
    let minDate = moment(moment());
    let maxDate = moment(periods[0].dateRange[1], DATE_STRING);

    for (let i = 1; i < periods.length; i++) {
      const period = periods[i];

      const { dateRange } = period;

      const fromDateMoment = moment(dateRange[0], DATE_STRING);
      const toDateMoment = moment(dateRange[1], DATE_STRING);

      if (fromDateMoment.diff(minDate, "days") > 0) {
        minDate = fromDateMoment;
      }

      if (toDateMoment.diff(maxDate, "days") > 0) {
        maxDate = toDateMoment;
      }
    }

    return [minDate, maxDate];
  }, [periods]);

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
        <DatePicker
          minDate={minDate}
          maxDate={maxDate}
          onChange={handleDateSelect}
          value={date}
          disablePast={true}
          InputLabelProps={{
            shrink: true
          }}
        ></DatePicker>
      </div>
      <Divider />
      <div className='time_range_input '>
        <h3 className='label'>Time slots</h3>
        {timeSlots.map((timeSlot, i) => (
          <div className='time_pickers'>
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
