import { TextFieldProps } from "@material-ui/core";
import React from "react";
import { validateNameInput } from "../../pages/setup-form/utils";

interface InputWithOnBlurErrorChecksProps {
  InputComponent: React.FunctionComponentElement<TextFieldProps>;
  input: string;
  onBlurErrorMsg: string | null; //helperText
  addOnBlurError: (inputName: string, newError: string) => void;
  clearOnBlurError: (inputName: string) => void;
}

export const InputWithOnBlurErrorChecks: React.FC<InputWithOnBlurErrorChecksProps> = props => {
  const {
    InputComponent,
    input,
    onBlurErrorMsg,
    addOnBlurError,
    clearOnBlurError
  } = props;

  const { name } = InputComponent.props;

  const handleNameOnBlur = () => {
    const error = validateNameInput(input);

    if (error) addOnBlurError(name!, error);
    else if (onBlurErrorMsg) clearOnBlurError(name!);
  };

  const ChildWithProps = React.cloneElement(
    InputComponent,
    {
      onBlur: handleNameOnBlur,
      onFocus: () => clearOnBlurError(name!),
      error: onBlurErrorMsg ? true : false,
      helperText: onBlurErrorMsg
    },
    null
  );

  return <>{ChildWithProps}</>;
};
