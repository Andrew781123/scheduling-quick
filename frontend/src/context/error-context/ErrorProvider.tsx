import React, { createContext, useState } from "react";

interface ErrorProviderProps {}

interface ProviderProps {
  error: {
    isShown: boolean;
    errors: string[];
  };
}

const initialErrorState: Pick<ProviderProps, "error"> = {
  error: {
    isShown: false,
    errors: []
  }
};

export const ErrorContext = createContext<ProviderProps>(undefined!);

export const ErrorProvider: React.FC<ErrorProviderProps> = props => {
  const [errorState, setErrorState] = useState(initialErrorState);

  return (
    <ErrorContext.Provider
      value={{
        error: errorState.error
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};
