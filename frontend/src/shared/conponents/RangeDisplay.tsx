import React from "react";

interface RangeDisplayProps {
  fromRange: string;
  toRange: string;
}

export const RangeDisplay: React.FC<RangeDisplayProps> = props => {
  const { fromRange, toRange } = props;

  return (
    <span className='dataText'>
      {fromRange} - {toRange}
    </span>
  );
};
