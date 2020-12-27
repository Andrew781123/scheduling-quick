import React from "react";
import { CommonByPeopleElement, TimeAvailable } from "../../../../../types";
import { CommonAvailableElement } from "../CommonAvailableElement/CommonAvailableElement";

interface CommonAvailableCategoryGroupProps {
  index: number;
  category: CommonByPeopleElement[];
  commonAvailable: TimeAvailable;
  participantCount: number;
}

export const CommonAvailableCategoryGroup: React.FC<CommonAvailableCategoryGroupProps> = props => {
  const { index, category, commonAvailable, participantCount } = props;

  return (
    <div>
      <h1>Category {index}</h1>
      {category.map((element, i) => (
        <CommonAvailableElement
          key={i}
          index={i + 1}
          date={element[0]}
          timeSlotIndex={element[1]}
          commonAvailable={commonAvailable}
          participantCount={participantCount}
        />
      ))}
    </div>
  );
};
