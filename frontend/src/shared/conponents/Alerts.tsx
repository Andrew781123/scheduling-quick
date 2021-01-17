import Alert from "@material-ui/lab/Alert";
import React, { useContext, useEffect } from "react";
import { ErrorContext } from "../../context/error-context/ErrorProvider";

interface AlertsProps {}

export const Alerts: React.FC<AlertsProps> = props => {
  const { errors } = useContext(ErrorContext);

  useEffect(() => {
    if (errors.length > 0) window.scrollTo(0, 0);
  }, [errors]);

  if (errors.length > 0)
    return (
      <div style={{ position: "sticky" }}>
        {errors.map(error => (
          <Alert severity='error'>{error}</Alert>
        ))}
      </div>
    );
  else return null;
};
