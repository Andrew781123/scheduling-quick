import React from "react";
import { CategoryTitleIcons } from "./CategoryTitleIcons";

interface CategoryTitleProps {
  categoryType: number;
}

export const CategoryTitle: React.FC<CategoryTitleProps> = props => {
  const { categoryType } = props;

  const durationOk = categoryType === 1 || categoryType === 3;
  const peopleOk = categoryType === 1 || categoryType === 2;

  return <CategoryTitleIcons durationOk={durationOk} peopleOk={peopleOk} />;
};
