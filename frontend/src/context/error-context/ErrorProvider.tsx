import React, { createContext, useState } from "react";

interface ErrorProviderProps {}

interface ErrorState {
  isShown: boolean;
  errors: string[];
}

interface ProviderProps {
  errors: string[];
  isShown: boolean;
  pushErrors: (newErrors: string[]) => void;
  clearErrors: () => void;
}

const initialErrorState: ErrorState = {
  isShown: false,
  errors: []
};

export const ErrorContext = createContext<ProviderProps>(undefined!);

export const ErrorProvider: React.FC<ErrorProviderProps> = props => {
  const [errorState, setErrorState] = useState(initialErrorState);

  const pushErrors = (newErrors: string[]) => {
    setErrorState(errorState => ({
      ...errorState,
      errors: [...errorState.errors, ...newErrors]
    }));
  };

  const clearErrors = () => {
    setErrorState(errorState => ({
      ...errorState,
      errors: []
    }));
  };

  return (
    <ErrorContext.Provider
      value={{
        errors: errorState.errors,
        isShown: errorState.isShown,
        pushErrors,
        clearErrors
      }}
    >
      {props.children}
    </ErrorContext.Provider>
  );
};
