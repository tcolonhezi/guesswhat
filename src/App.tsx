import styles from "./App.module.css";
import Button from "./components/button";
import Input from "./components/input";
import Letter from "./components/letter";
import LetterUsed, { type LettersUsedProps } from "./components/lettersUsed";
import Header from "./components/header";
import Tip from "./components/tip";
import restart from "./assets/restart.svg";

import { WORDS, type Challenge } from "./utils/words";
import { useEffect, useState } from "react";
import ReactConfetti from "react-confetti";

function App() {
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [attempts, setAttempts] = useState(0);
  const [letter, setLetter] = useState("");
  const [lettersUsed, setLettersUsed] = useState<LettersUsedProps[]>([]);
  const [score, setScore] = useState(0);
  const [isWinner, setIsWinner] = useState(false);
  const [isLoser, setIsLoser] = useState(false);

  function handleRestartGame() {
    startGame();
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
      return alert(`Letra ${letter} já foi utilizada.`);
    }

    const maxAttempts = challenge.word.length * 2;
    if (maxAttempts === attempts) {
      return setIsLoser(true);
    }

    const hits = challenge.word
      .toUpperCase()
      .split("")
      .filter((char) => char === letter).length;

    const currentScore = score + hits;
    if (hits > 0) {
      setLettersUsed([...lettersUsed, { letter: letter, correct: true }]);
    } else {
      setLettersUsed([...lettersUsed, { letter: letter, correct: false }]);
    }

    setAttempts(attempts + 1);
    setScore(currentScore);

    if (currentScore === challenge.word.length) {
      setIsWinner(true);
    }
    setLetter("");
  }

  function startGame() {
    const index = Math.floor(Math.random() * WORDS.length);
    const challenge = WORDS[index];
    setIsWinner(false);
    setIsLoser(false);
    setChallenge(challenge);
    setLettersUsed([]);
    setScore(0);
    setAttempts(0);
    setLetter("");
  }

  useEffect(() => {
    startGame();
  }, []);

  if (!challenge)
    return (
      <div className={styles.overlay}>
        <h2>Carregando...</h2>
      </div>
    );
  return (
    <div className={styles.container}>
      <main>
        {isWinner && (
          <div className={styles.overlay}>
            <h1>Parabéns! 🎉</h1>
            <button type="button" onClick={handleRestartGame}>
              <img src={restart} alt="Reiniciar jogo" />
            </button>
            <ReactConfetti
              width={window.innerWidth}
              height={window.innerHeight}
            />
          </div>
        )}
        {isLoser && (
          <div className={styles.overlay}>
            <h2>Tentativas esgotadas.</h2>
            <button type="button" onClick={handleRestartGame}>
              <img src={restart} alt="Reiniciar jogo" />
            </button>
          </div>
        )}
        <Header
          current={attempts}
          max={challenge.word.length * 2}
          onRestart={handleRestartGame}
        />
        <Tip tip={challenge.tip} />
        <div className={styles.word}>
          {challenge.word.split("").map((char, index) => {
            const letterToDisplay = lettersUsed.find((e) => e.letter === char);
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
              onChange={(e) => setLetter(e.target.value.toUpperCase())}
            />
            <Button text="Confirmar" onClick={handleConfirmLetter} />
          </div>
        </div>
        <div className={styles.line} />
        <LetterUsed data={lettersUsed} />
      </main>
    </div>
  );
}

export default App;
