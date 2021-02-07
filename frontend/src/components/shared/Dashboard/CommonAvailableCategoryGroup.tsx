import React from "react";
import { CommonByPeopleElement, TimeAvailable } from "../../../../../types";
import { GREEN_COLOR, RED_COLOR } from "../../../shared/constants";
import { CommonAvailableElement } from "../CommonAvailableElement/CommonAvailableElement";

interface CommonAvailableCategoryGroupProps {
  index: number;
  category: CommonByPeopleElement[];
  commonAvailable: TimeAvailable;
  participantCount: number;
}

export const CommonAvailableCategoryGroup: React.FC<CommonAvailableCategoryGroupProps> = props => {
  const { index, category, commonAvailable, participantCount } = props;

  const timeSlotIconColor =
    index === 1 || index === 3 ? GREEN_COLOR : RED_COLOR;
  const peopleIconColor = index === 1 || index === 2 ? GREEN_COLOR : RED_COLOR;

  return (
    <>
      {category.length > 0 ? (
        category.map((element, i) => (
          <CommonAvailableElement
            key={i}
            index={i + 1}
            date={element[0]}
            timeSlotIndex={element[1]}
            commonAvailable={commonAvailable}
            participantCount={participantCount}
            timeSlotIconColor={timeSlotIconColor}
            peopleIconColor={peopleIconColor}
          />
        ))
      ) : (
        <h2 style={{ color: "#868686", textAlign: "center" }}>Empty</h2>
      )}
    </>
  );
};
