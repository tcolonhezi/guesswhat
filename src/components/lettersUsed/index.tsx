import Letter from "../letter";
import styles from "./styles.module.css";

export type LettersUsedProps = {
  letter: string;
  correct: boolean;
};

type Props = {
  data: LettersUsedProps[];
};

export default function LetterUsed({ data }: Props) {
  return (
    <div className={styles.container}>
      <h5>Letras Utilizadas</h5>
      <div className={styles.usedLetters}>
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
