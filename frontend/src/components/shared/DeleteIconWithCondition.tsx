import React, { ReactElement, ReactNode } from "react";

interface DeleteIconWithConditionProps {
  componentLength: number;
}

export const DeleteIconWithCondition: React.FC<DeleteIconWithConditionProps> = (
  props
): ReactElement | null => {
  const { children, componentLength } = props;

  if (componentLength !== 1) return children as ReactElement;
  else return null;
};
