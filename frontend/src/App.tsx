import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import { SetupForm } from "./pages/setup-form/SetupForm";
import "./App.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import dotenv from "dotenv";
import { HomePage } from "./pages/home-page/HomePage";
dotenv.config();

const App: React.FC = () => {
  let history: any = useHistory();

  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      <Router>
        <Switch>
          <Route exact path='/events/new'>
            <SetupForm />
          </Route>
          <Route exact path='/' component={HomePage} />
        </Switch>
      </Router>
    </MuiPickersUtilsProvider>
  );
};

export default App;
