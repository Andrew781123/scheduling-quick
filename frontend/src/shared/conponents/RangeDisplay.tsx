import React from "react";

interface RangeDisplayProps {
  fromRange: string;
  toRange: string;
  icon: JSX.Element;
}

export const RangeDisplay: React.FC<RangeDisplayProps> = props => {
  const { fromRange, toRange, icon } = props;

  return (
    <div className='icon_with_data'>
      {icon}
      {fromRange} - {toRange}
    </div>
  );
};
