import React from "react";
import { SetupForm } from "./pages/setup-form/SetupForm";
import "./App.css";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";

const App: React.FC = () => {
  return (
    <div className='App'>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SetupForm />
      </MuiPickersUtilsProvider>
    </div>
  );
};

export default App;
