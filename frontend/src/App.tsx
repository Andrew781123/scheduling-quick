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
dotenv.config();

const App: React.FC = () => {
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
              component={NewParcipantForm}
            />
          </EventProvider>
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default App;
