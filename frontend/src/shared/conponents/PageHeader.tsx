import React from "react";

interface PageHeaderProps {
  icon: JSX.Element;
  headerText: string;
}

export const PageHeader: React.FC<PageHeaderProps> = props => {
  const { icon, headerText } = props;

  return (
    <div className='page_header'>
      <span className='page_header_text'>{headerText}</span>
      {icon}
    </div>
  );
};
