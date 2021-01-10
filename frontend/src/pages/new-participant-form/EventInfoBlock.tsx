import { Collapse, IconButton } from "@material-ui/core";
import React, { useState } from "react";
import { DateAndTimeSlotDisplay } from "../../shared/conponents/DateAndTimeSlotDisplay";
import { InformationTypeDataPair } from "./InformationTypeDataPair";
import { EventInfo } from "./types";
import ExpandMoreOutlinedIcon from "@material-ui/icons/ExpandMoreOutlined";
import ExpandLessOutlinedIcon from "@material-ui/icons/ExpandLessOutlined";

interface EventInfoBlockProps {
  eventInfo: EventInfo;
}

export const EventInfoBlock: React.FC<EventInfoBlockProps> = props => {
  const { eventInfo } = props;

  const {
    venue,
    organizer,
    evnetPossibleDataAndTime,
    participantCount,
    eventDuration: { durationHour, durationMin }
  } = eventInfo;

  const [doShowPossibleDateAndTime, setDoShowPossibleDateAndTime] = useState(
    false
  );

  return (
    <div className='event_info_container'>
      <h2 className='event_info_header'>Event Info</h2>

      <div className='event_info'>
        <InformationTypeDataPair type='Oragnizer' data={organizer} />
        <InformationTypeDataPair type='Venue' data={venue} />
        <InformationTypeDataPair
          type='Number of participants'
          data={participantCount}
        />

        <div className='information_type_data_pair_container'>
          <span className='information_type_text'>Event duration: </span>
          <span className='information_data'>
            {durationHour} hours {durationMin} minutes
          </span>
        </div>

        <div className='information_type_data_pair_container'>
          <span className='information_type_text'>
            Event possible date and time:
          </span>

          {evnetPossibleDataAndTime.length > 3 ? (
            <>
              <IconButton
                onClick={() => setDoShowPossibleDateAndTime(state => !state)}
              >
                {doShowPossibleDateAndTime ? (
                  <ExpandLessOutlinedIcon />
                ) : (
                  <ExpandMoreOutlinedIcon />
                )}
              </IconButton>
              <Collapse in={doShowPossibleDateAndTime}>
                {evnetPossibleDataAndTime.map((dateAndTime, i) => (
                  <div className='information_data' key={i}>
                    <DateAndTimeSlotDisplay
                      date={dateAndTime.dateRange}
                      timeSlot={dateAndTime.timeRange}
                    />
                  </div>
                ))}
              </Collapse>
            </>
          ) : (
            evnetPossibleDataAndTime.map((dateAndTime, i) => (
              <div className='information_data_container' key={i}>
                <span>#{i + 1}</span>
                <div className='information_data'>
                  <DateAndTimeSlotDisplay
                    date={dateAndTime.dateRange}
                    timeSlot={dateAndTime.timeRange}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
