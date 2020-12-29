import React from "react";
import { DateAndTimeSlotDisplay } from "../../shared/conponents/DateAndTimeSlotDisplay";
import { InformationTypeDataPair } from "./InformationTypeDataPair";
import { EventInfo } from "./types";

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

  return (
    <div className='event_info'>
      <InformationTypeDataPair type='Oragnizer' data={organizer} />
      <InformationTypeDataPair type='Venue' data={venue} />
      <InformationTypeDataPair
        type='Number of participants'
        data={participantCount}
      />

      <div className='information_type_date_pair_container'>
        <span className='information_type'>Event duration: </span>
        <span className='information_data'>
          {durationHour} hours {durationMin} minutes
        </span>
      </div>

      <div className='information_type_date_pair_container'>
        <span className='information_type'>Event possible date and time:</span>
        {evnetPossibleDataAndTime.map(dateAndTime => (
          <div className='information_data'>
            <DateAndTimeSlotDisplay
              date={dateAndTime.dateRange}
              timeSlot={dateAndTime.timeRange}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
