import type { Challenge } from "../../constants/words";
import Header from "../header/header";
import { type LettersUsedProps } from "../lettersUsed/lettersUsed";
import Tip from "../tip/tip";
import Letter from "../letter/letter";
import { useEffect, useState } from "react";
import { RestartScreen } from "../restartScreen/restartScreen";
import type { Dispatch, SetStateAction } from "react";
import VirtualKeyboard from "../virtualKeyboard/virtualKeyboard";

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

  function handleGuess(letter: string) {
    if (isWinner || isLoser) return;

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === letter).length;

    const nextScore = score + hits;
    const nextAttempts = attempts + 1;
    const maxAttempts = challenge.word.length * 2;

    setLettersUsed((prev) => [...prev, { letter, correct: hits > 0 }]);
    setAttempts(nextAttempts);
    setScore(nextScore);

    if (nextScore === challenge.word.length) setIsWinner(true);
    else if (nextAttempts >= maxAttempts) setIsLoser(true);
  }

  function handleConfirmLetter() {
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
      .filter(
        (char) =>
          char.normalize("NFD").replace(/[\u0300-\u036f]/g, "") === letter,
      ).length;

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
    <div>
      <Header
        current={attempts}
        max={challenge.word.length * 2}
        onRestart={handleRestartGame}
        handleChangeTheme={handleChangeTheme}
        isOffline={isOffline}
      />

      <Tip tip={challenge.tip} />
      <div className="my-10 flex w-full flex-wrap justify-center gap-4">
        {challenge.word.split("").map((char, index) => {
          const letterToDisplay = lettersUsed.find(
            (e) =>
              e.letter.toLocaleLowerCase() ===
              char.normalize("NFD").replace(/[\u0300-\u036f]/g, ""),
          );
          if (letterToDisplay) {
            return <Letter key={`${char}-${index}`} letter={char} />;
          } else {
            return <Letter key={`${char}-${index}`} letter="" />;
          }
        })}
      </div>

      <div>
        <h4 className="font-bold">Palpite</h4>
        <div className="my-3 flex gap-3">
          <VirtualKeyboard
            lettersUsed={lettersUsed}
            onKeyPress={handleGuess}
            disabled={isWinner || isLoser}
          />
        </div>
      </div>
      <div className="border-t-2 border-divider" />

      {isWinner && (
        <RestartScreen isWinner handleRestartGame={handleRestartGame} />
      )}
      {isLoser && <RestartScreen handleRestartGame={handleRestartGame} />}
    </div>
  );
}
