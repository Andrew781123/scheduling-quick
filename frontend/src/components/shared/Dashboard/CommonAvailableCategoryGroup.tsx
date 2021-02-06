import React from "react";
import { CommonByPeopleElement, TimeAvailable } from "../../../../../types";
import { CommonAvailableElement } from "../CommonAvailableElement/CommonAvailableElement";
import { CategoryTitle } from "../../../pages/dashboard/CategoryTitle";
import { Box, Divider } from "@material-ui/core";

interface CommonAvailableCategoryGroupProps {
  index: number;
  category: CommonByPeopleElement[];
  commonAvailable: TimeAvailable;
  participantCount: number;
}

export const CommonAvailableCategoryGroup: React.FC<CommonAvailableCategoryGroupProps> = props => {
  const { index, category, commonAvailable, participantCount } = props;

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
          />
        ))
      ) : (
        <h2>Empty</h2>
      )}

      <Box mb={3} />
    </>
  );
};
