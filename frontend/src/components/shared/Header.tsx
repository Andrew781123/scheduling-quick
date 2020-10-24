import React from "react";

interface HeaderProps {
  title: string;
}

export const Header: React.FC<HeaderProps> = props => {
  const { title } = props;

  return <h2>{title}</h2>;
};
