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
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/75">
      <h1 className="px-4 text-center text-4xl font-bold text-white sm:text-[4rem]">
        {isWinner ? "Parabéns! 🎉" : "Tentativas esgotadas."}
      </h1>
      <button
        className="mt-4 border-0 bg-transparent"
        type="button"
        onClick={handleRestartGame}
      >
        <img src={restart} alt="Reiniciar jogo" />
      </button>
      {isWinner && (
        <ReactConfetti width={window.innerWidth} height={window.innerHeight} />
      )}
    </div>
  );
}
