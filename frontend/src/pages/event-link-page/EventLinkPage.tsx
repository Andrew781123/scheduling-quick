import React, { useMemo } from "react";
import { RouteComponentProps } from "react-router-dom";
import { Link } from "react-router-dom";
import { PageHeader } from "../../shared/conponents/PageHeader";
import CheckIcon from "@material-ui/icons/Check";

interface EventLinkPageProps {}

interface LocationState {
  eventId: string;
}

export const EventLinkPage: React.FC<
  EventLinkPageProps & RouteComponentProps<{}, any, LocationState | any>
> = props => {
  const eventId = props.location.state.eventId;

  const link = useMemo(() => {
    return `${process.env.REACT_APP_CLIENT_URL}/events/${eventId}/new-participant`;
  }, [eventId]);

  return (
    <div className='page_container'>
      <PageHeader
        icon={<CheckIcon fontSize='large' />}
        headerText='Event Created'
      />
      <h3>Send the following link to participants</h3>
      <Link
        to={{
          pathname: `/events/${eventId}/new-participant`
        }}
      >
        {link}
      </Link>
    </div>
  );
};
