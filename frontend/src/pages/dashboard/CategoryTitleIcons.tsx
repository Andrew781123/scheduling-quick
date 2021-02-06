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

  const timeIconColor = durationOk ? "#52E77D" : "#FA9599";
  const peopleIconColor = peopleOk ? "#52E77D" : "#FA9599";

  return (
    <div className='category_title_icons'>
      <WatchLaterIcon style={{ fill: timeIconColor }} fontSize='default' />
      <Box component='span' mx={0.7} />
      <PeopleAltIcon style={{ fill: peopleIconColor }} fontSize='default' />
    </div>
  );
};
