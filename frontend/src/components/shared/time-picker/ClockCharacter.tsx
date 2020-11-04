import React, { useMemo } from "react";

interface ClockCharactorProps {
  character: string;
  size: string;
}

export const ClockCharacter: React.FC<ClockCharactorProps> = props => {
  const { character, size } = props;

  const characterStyle = useMemo(() => {
    return {
      fontSize: size
    };
  }, [size]);

  return (
    <div className='clock-charactor' style={characterStyle}>
      {character}
    </div>
  );
};
