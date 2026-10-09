import styles from "./styles.module.css";
import type { Challenge } from "../../utils/words";
import Button from "../button";
import Header from "../header";
import Input from "../input";
import LetterUsed, { type LettersUsedProps } from "../lettersUsed";
import Tip from "../tip";
import Letter from "../letter";
import { useEffect, useState, type ChangeEvent } from "react";
import { RestartScreen } from "../restartScreen/restartScreen";
import type { Dispatch, SetStateAction } from "react";

type GameProps = {
  isOffline: boolean;
  challenge: Challenge;
  setRestartGame: Dispatch<SetStateAction<boolean>>;
  handleChangeTheme: () => void;
};

export function Game({
  challenge,
  setRestartGame,
  handleChangeTheme,
  isOffline,
}: GameProps) {
  const [attempts, setAttempts] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [score, setScore] = useState(0);

  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);

  function handleRestartGame() {
    setAttempts(0);
    setLetter("");
    setLettersUsed([]);
    setScore(0);
    setIsWinner(false);
    setIsLoser(false);
    setRestartGame(true);
  }

  useEffect(() => {
    if (!letter) return;
    handleConfirmLetter();
  }, [letter]);

  function handleInputLetter(e: ChangeEvent<HTMLInputElement>) {
    setLetter(e.target.value.toUpperCase());
  }

  function handleConfirmLetter() {
    console.log(challenge, letter, score);
    if (!challenge) {
      return;
    }

    if (!letter.trim()) {
      return alert("Digite uma letra.");
    }

    const isOnLettersUsed = lettersUsed.find((used) => used.letter === letter);
    if (isOnLettersUsed) {
      setLetter("");
      return alert(`Letra ${letter} já foi utilizada.`);
    }

    const maxAttempts = challenge.word.length * 2;
    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === letter).length;

    const currentScore = score + hits;
    const nextAttempts = attempts + 1;
    if (hits > 0) {
      setLettersUsed([...lettersUsed, { letter: letter, correct: true }]);
    } else {
      setLettersUsed([...lettersUsed, { letter: letter, correct: false }]);
    }

    setAttempts(nextAttempts);
    setScore(currentScore);

    if (currentScore === challenge.word.length) {
      setIsWinner(true);
    } else if (nextAttempts >= maxAttempts) {
      setIsLoser(true);
    }
    setLetter("");
  }

  return (
    <div className={styles.main}>
      <Header
        current={attempts}
        max={challenge.word.length * 2}
        onRestart={handleRestartGame}
        handleChangeTheme={handleChangeTheme}
        isOffline={isOffline}
      />

      <Tip tip={challenge.tip} />
      <div className={styles.word}>
        {challenge.word.split("").map((char, index) => {
          const letterToDisplay = lettersUsed.find(
            (e) => e.letter.toLocaleLowerCase() === char,
          );
          if (letterToDisplay) {
            return <Letter key={`${char}-${index}`} letter={char} />;
          } else {
            return <Letter key={`${char}-${index}`} letter="" />;
          }
        })}
      </div>

      <div>
        <h4>Palpite</h4>
        <div className={styles.guessInput}>
          <Input
            autoFocus
            maxLength={1}
            placeholder="?"
            value={letter}
            onChange={handleInputLetter}
          />
        </div>
      </div>
      <div className={styles.line} />
      <LetterUsed data={lettersUsed} />

      {isWinner && (
        <RestartScreen isWinner handleRestartGame={handleRestartGame} />
      )}
      {isLoser && <RestartScreen handleRestartGame={handleRestartGame} />}
    </div>
  );
}
