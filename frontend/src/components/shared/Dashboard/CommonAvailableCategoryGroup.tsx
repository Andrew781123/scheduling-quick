import React from "react";
import { CommonByPeopleElement, TimeAvailable } from "../../../../../types";
import { CommonAvailableElement } from "../CommonAvailableElement/CommonAvailableElement";
import { CategoryTitle } from "../../../pages/dashboard/CategoryTitle";
import { Box } from "@material-ui/core";

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
      <div className='common_available_category_group'>
        <CategoryTitle categoryType={index} />

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
      </div>

      <Box mb={3} />
    </>
  );
};
