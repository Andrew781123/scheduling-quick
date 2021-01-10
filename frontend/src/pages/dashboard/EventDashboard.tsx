import { Box, Button, Divider } from "@material-ui/core";
import React, { useContext, useEffect } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { CommonAvailableCategoryGroup } from "../../components/shared/Dashboard/CommonAvailableCategoryGroup";
import { EventContext } from "../../context/event-context/EventProvider";
import { PageHeader } from "../../shared/conponents/PageHeader";
import { EventInfoBlock } from "../new-participant-form/EventInfoBlock";
import "./EventDashBoard.scss";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Alert from "@material-ui/lab/Alert";

interface routeProps {
  id: string;
}

interface EventDashboardProps extends RouteComponentProps<routeProps> {}

export const EventDashboard: React.FC<EventDashboardProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    history
  } = props;

  const { event, fetchEvent } = useContext(EventContext);
  const {
    commonAvailable,
    commonAvailableCategory,
    participants,
    info: { venue, organizer },
    periods,
    duration
  } = event;

  useEffect(() => {
    //update the commonAvailable if redirected from form
    if (!commonAvailable) {
      fetchEvent(eventId);
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className='page_container'>
      <Alert
        severity='info'
        action={
          <Button
            color='inherit'
            size='small'
            onClick={() =>
              history.push({ pathname: `/events/${eventId}/new-participant` })
            }
          >
            Join event
          </Button>
        }
      >
        Not yet joined?
      </Alert>

      <PageHeader icon={<DashboardIcon />} headerText='Dashboard' />
      <EventInfoBlock
        eventInfo={{
          venue: venue.name,
          organizer: organizer,
          evnetPossibleDataAndTime: periods,
          participantCount: participants.length,
          eventDuration: duration
        }}
      />

      <Box my={5} />

      <div className='dashboard_common_available'>
        <h1 className='header'>Results</h1>
        <Divider />
        <Box mb={1.5} />
        {commonAvailable &&
          commonAvailableCategory &&
          Object.keys(commonAvailableCategory).map((categoryIndex, i) => (
            <CommonAvailableCategoryGroup
              key={i}
              category={commonAvailableCategory[+categoryIndex]}
              commonAvailable={commonAvailable}
              participantCount={participants.length}
              index={i + 1}
            />
          ))}
      </div>

      <Button
        onClick={() => {
          history.push({
            pathname: `/events/${eventId}/new-participant`
          });
        }}
      >
        Go to form
      </Button>
    </div>
  );
};
