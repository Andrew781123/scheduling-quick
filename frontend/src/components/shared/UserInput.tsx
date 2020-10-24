import React, { useState } from "react";

interface UserInputProps {
  label: string;
  placeholder?: string;
}

export const UserInput: React.FC<UserInputProps> = props => {
  const { label, placeholder } = props;

  const [input, setInput] = useState("");

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <div>
      <label htmlFor='textInput'>{label + ":"}</label>
      <input
        type='text'
        name='textInput'
        value={input}
        placeholder={placeholder}
        onChange={handleUserInput}
      />
    </div>
  );
};
