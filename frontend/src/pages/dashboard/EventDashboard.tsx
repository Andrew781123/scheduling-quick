import { Button } from "@material-ui/core";
import React, { useContext, useEffect, useMemo } from "react";
import { RouteComponentProps, Redirect } from "react-router-dom";
import { EventContext } from "../../context/event-context/EventProvider";

interface routeProps {
  id: string;
}

interface EventDashboardProps extends RouteComponentProps<routeProps> {}

const hasFilledInForm: string | null = localStorage.getItem(
  "HAS_FILLED_IN_FORM"
);

export const EventDashboard: React.FC<EventDashboardProps> = props => {
  const {
    match: {
      params: { id: eventId }
    },
    history
  } = props;

  const { event, fetchEvent } = useContext(EventContext);
  const { commonAvailable, commonByPeople } = event;

  useEffect(() => {
    //update the commonAvailable if redirected from form
    if (!commonAvailable) {
      fetchEvent(eventId);
    }
    console.log(commonByPeople);
    // eslint-disable-next-line
  }, []);

  // const timeAvailableResults = useMemo(() => {

  // }, [commonAvailable, commonByPeople]);

  if (!hasFilledInForm) {
    return (
      <Redirect
        to={{
          pathname: `/events/${eventId}/new-participant`,
          state: { hasFilledInForm: false }
        }}
      />
    );
  } else
    return (
      <>
        <h1>Dashboard</h1>
        <h2>id: {eventId}</h2>

        {commonAvailable && commonByPeople && (
          <div className='dashboard_common_available'>
            <h2>Common available: </h2>
            {commonByPeople.map(([date, timeSlotIndex], index) => {
              return (
                <div key={index} className='common_available_element'>
                  <h3>
                    #{index}: {date}
                  </h3>
                  <h3>
                    Available People:{" "}
                    {commonAvailable[date][timeSlotIndex][2].map(
                      (name, index) => {
                        return <span key={index}>{name}, </span>;
                      }
                    )}
                  </h3>
                </div>
              );
            })}
          </div>
        )}

        <Button
          onClick={() => {
            history.push({
              pathname: `/events/${eventId}/new-participant`,
              state: { hasFilledInForm: true }
            });
          }}
        >
          Go to form
        </Button>
        <Button onClick={() => localStorage.removeItem("HAS_FILLED_IN_FORM")}>
          Clear local storage
        </Button>
      </>
    );
};
