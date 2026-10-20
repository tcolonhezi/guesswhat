import Letter from "../letter";

export type LettersUsedProps = {
  letter: string;
  correct: boolean;
};

type Props = {
  data: LettersUsedProps[];
};

export default function LetterUsed({ data }: Props) {
  return (
    <div>
      <h5 className="font-bold">Letras Utilizadas</h5>
      <div className="mt-3 flex flex-wrap gap-3">
        {data.map(({ letter, correct }) => {
          return (
            <Letter
              key={`${letter}`}
              letter={letter}
              size="small"
              color={correct ? "correct" : "wrong"}
            />
          );
        })}
      </div>
    </div>
  );
}
