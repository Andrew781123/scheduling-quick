import React from "react";
import { Button } from "@material-ui/core";
import * as H from "history";

interface HomePageProps {
  history: H.History;
}

export const HomePage: React.FC<HomePageProps> = props => {
  const redirectToSetupForm = () => {
    return props.history.push("/events/new");
  };

  return (
    <>
      <h1>Home Page</h1>
      <Button onClick={redirectToSetupForm} variant='contained' color='primary'>
        Set up new event!
      </Button>
    </>
  );
};
