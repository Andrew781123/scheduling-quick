import React from "react";

interface InformationTypeDataPairProps {
  type: string;
  data: string | number;
}

export const InformationTypeDataPair: React.FC<InformationTypeDataPairProps> = props => {
  const { type, data } = props;

  return (
    <div className='information_type_data_pair_container'>
      <span className='information_type'>{type}: </span>
      <span className='information_data'>{data}</span>
    </div>
  );
};
