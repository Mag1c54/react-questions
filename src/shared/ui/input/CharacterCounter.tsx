interface CharacterCounterProps {
  length: number;
  max: number;
}

export const CharacterCounter = ({ length, max }: CharacterCounterProps) => (
  <>
    {length}/{max}
  </>
);
