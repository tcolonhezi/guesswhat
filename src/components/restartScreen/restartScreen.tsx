import styles from "./styles.module.css";
import restart from "../../assets/restart.svg";
import ReactConfetti from "react-confetti";
type RestartScreenProps = {
  isWinner?: boolean;
  handleRestartGame: () => void;
};

export function RestartScreen({
  handleRestartGame,
  isWinner = false,
}: RestartScreenProps) {
  return (
    <div className={styles.overlay}>
      {isWinner ? <h1>Parabéns! 🎉</h1> : <h1>Tentativas esgotadas.</h1>}
      <button type="button" onClick={handleRestartGame}>
        <img src={restart} alt="Reiniciar jogo" />
      </button>
      {isWinner && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}
