import React from "react";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { GREEN_COLOR, RED_COLOR } from "../../../shared/constants";

interface PeopleListProps {
  peopleList: string[];
  available?: boolean;
}

export const PeopleList: React.FC<PeopleListProps> = props => {
  const { peopleList, available } = props;

  const iconColor = available ? GREEN_COLOR : RED_COLOR;

  return (
    <div
      className='icon_with_data icon_with_data_span people_list'
      style={{ alignItems: "flex-start" }}
    >
      <PeopleAltIcon style={{ color: iconColor }} />{" "}
      <span>
        {peopleList.map((name, index) => {
          return <p key={index}> {name}</p>;
        })}
      </span>
    </div>
  );
};
