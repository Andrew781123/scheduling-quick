import { Box, Divider } from "@material-ui/core";
import React from "react";

interface ComponentDividerProps {}

export const ComponentDivider: React.FC<ComponentDividerProps> = props => {
  return (
    <>
      <Box mt={1} />
      <Divider />
      <Box mb={1} />
    </>
  );
};
