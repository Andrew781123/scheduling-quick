import React from "react";
import EventIcon from "@material-ui/icons/Event";

interface DateWithIconProps {
  date: string;
}

export const DateWithIcon: React.FC<DateWithIconProps> = props => {
  const { date } = props;

  return (
    <div className='icon_with_data icon_with_data_span'>
      <EventIcon />
      {date}
    </div>
  );
};
