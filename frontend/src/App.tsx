import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { SetupForm } from "./pages/setup-form/SetupForm";
import "./App.scss";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import dotenv from "dotenv";
import { HomePage } from "./pages/home-page/HomePage";
import { EventLinkPage } from "./pages/event-link-page/EventLinkPage";
import { EventDashboard } from "./pages/dashboard/EventDashboard";
import { NewParcipantForm } from "./pages/new-participant-form/NewParcipantForm";
import EventProvider from "./context/event-context/EventProvider";
import { NotFound } from "./NotFound";
dotenv.config();

const App: React.FC = () => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <EventProvider>
        <Router>
          <Switch>
            <Route
              exact
              path='/events/new'
              render={props => <SetupForm {...props} />}
            />
            <Route exact path='/' component={HomePage} />
            <Route
              path='/events/new/success'
              render={props => <EventLinkPage {...props} />}
            />
            <Route path='/events/:id/dashboard' component={EventDashboard} />
            <Route
              path='/events/:id/new-participant'
              component={NewParcipantForm}
            />

            <Route path='*' component={NotFound} />
          </Switch>
        </Router>
      </EventProvider>
    </MuiPickersUtilsProvider>
  );
};

export default App;
