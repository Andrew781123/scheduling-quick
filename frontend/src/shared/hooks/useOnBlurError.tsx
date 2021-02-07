import { useState } from "react";

interface OnBlurErrors {
  [key: string]: string | null;
}

export default function useOnBlurError(inputNames: string[]) {
  const [onBlurErrors, setOnBlurErrors] = useState(() => {
    const initialOnBlurErrors = {};

    inputNames.forEach(
      name => ((initialOnBlurErrors as OnBlurErrors)[name] = null)
    );

    return initialOnBlurErrors as OnBlurErrors;
  });

  const addOnBlurError = (inputName: string, newError: string) => {
    setOnBlurErrors(error => ({
      ...error,
      [inputName]: newError
    }));
  };

  const clearOnBlurError = (inputName: string) => {
    setOnBlurErrors(error => ({
      ...error,
      [inputName]: null
    }));
  };

  return { onBlurErrors, addOnBlurError, clearOnBlurError };
}
