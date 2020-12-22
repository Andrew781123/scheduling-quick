import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SetupForm } from "./pages/setup-form/SetupForm";
import "./App.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import dotenv from "dotenv";
import { HomePage } from "./pages/home-page/HomePage";
import { EventLinkPage } from "./pages/event-link-page/EventLinkPage";
import { EventDashboard } from "./pages/dashboard/EventDashboard";
import { NewParcipantForm } from "./pages/new-participant-form/NewParcipantForm";
import EventProvider from "./context/event-context/EventProvider";
import * as H from 'history';
dotenv.config();

const App: React.FC = () => {
  let history: H.History<{hasFilledInForm?: boolean;}>;

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Switch>
          <Route
            exact
            path='/events/new'
            render={props => <SetupForm {...props} />}
          />
          <Route exact path='/' component={HomePage} />
          <Route
            exact
            path='/events/new/success'
            render={props => <EventLinkPage {...props} />}
          />
          <EventProvider>
            <Route path='/events/:id/dashboard' component={EventDashboard} />
            <Route
              exact
              path='/events/:id/new-participant'
              render={props => <NewParcipantForm history={history} />}
            />
          </EventProvider>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default App;
