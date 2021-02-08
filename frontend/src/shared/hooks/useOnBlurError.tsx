import { useState } from "react";

interface OnBlurErrorsMap {
  [key: string]: string | null;
}

export default function useOnBlurError(inputNames: string[]) {
  const [onBlurErrorsMap, setOnBlurErrorsMap] = useState(() => {
    const initialOnBlurErrors = {};

    inputNames.forEach(
      name => ((initialOnBlurErrors as OnBlurErrorsMap)[name] = null)
    );

    return initialOnBlurErrors as OnBlurErrorsMap;
  });

  const addOnBlurError = (inputName: string, newError: string) => {
    setOnBlurErrorsMap(error => ({
      ...error,
      [inputName]: newError
    }));
  };

  const clearOnBlurError = (inputName: string) => {
    setOnBlurErrorsMap(error => ({
      ...error,
      [inputName]: null
    }));
  };

  return { onBlurErrorsMap, addOnBlurError, clearOnBlurError };
}
