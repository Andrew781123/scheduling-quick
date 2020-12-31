import React from "react";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import { Box } from "@material-ui/core";

interface CategoryTitleIconsProps {
  durationOk: boolean;
  peopleOk: boolean;
}

export const CategoryTitleIcons: React.FC<CategoryTitleIconsProps> = props => {
  const { durationOk, peopleOk } = props;

  const timeIconColor = durationOk ? "green" : "red";
  const peopleIconColor = peopleOk ? "green" : "red";

  return (
    <div className='category_title_icons'>
      <WatchLaterIcon style={{ fill: timeIconColor }} fontSize='large' />
      <Box component='span' mx={0.7} />
      <PeopleAltIcon style={{ fill: peopleIconColor }} fontSize='large' />
    </div>
  );
};
