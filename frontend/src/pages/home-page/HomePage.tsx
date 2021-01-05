import React from "react";
import { Button } from "@material-ui/core";
import * as H from "history";
import "./HomePage.scss";
import Box from "@material-ui/core/Box";

interface HomePageProps {
  history: H.History;
}

export const HomePage: React.FC<HomePageProps> = props => {
  const redirectToSetupForm = () => {
    return props.history.push("/events/new");
  };

  return (
    <div className='page_container'>
      <div className='home_page'>
        <div className='home_page_instructions'>
          <h1 className='home_page_header'>Schedule events in simple steps</h1>

          <Box my={1} />

          <div className='home_page_shceduling_steps'>
            <p className='home_page_scheduling_step'>1. Create an event</p>
            <p className='home_page_scheduling_step'>
              2. Paticipants enter date and time
            </p>
            <p className='home_page_scheduling_step'>
              3. View auto generated common schedule
            </p>
          </div>
        </div>

        <Box my={2} />

        <div className='host_new_event_button_container'>
          <Button
            onClick={redirectToSetupForm}
            variant='contained'
            color='primary'
            className='Button'
          >
            Host new event!
          </Button>
        </div>
      </div>
    </div>
  );
};
