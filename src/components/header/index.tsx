import logo from "../../assets/logo.png";

type Props = {
  current: number;
  max: number;
  isOffline: boolean;
  onRestart: () => void;
  handleChangeTheme: () => void;
};

export default function Header({
  current,
  max,
  isOffline,
  onRestart,
  handleChangeTheme,
}: Props) {
  return (
    <div className="flex w-full flex-col items-center">
      <img className="h-15" src={logo} alt="Logo Adivinhe" />
      <header className="flex w-full flex-wrap items-center justify-between gap-4 py-13">
        <span className="text-[1.12rem] text-muted">
          <strong className="text-[1.37rem] text-score">{current}</strong>{" "}
          de {max} tentativas
        </span>
        <div className="flex gap-4">
          <button
            className="h-12 w-32 rounded-lg border-2 border-brand-dark bg-brand px-4 font-bold text-white"
            type="button"
            onClick={onRestart}
          >
            Reiniciar
          </button>
          <button
            className="h-12 w-40 rounded-lg border-2 border-brand-dark bg-brand px-4 font-bold text-white disabled:cursor-not-allowed disabled:opacity-60"
            onClick={handleChangeTheme}
            type="button"
            disabled={isOffline}
          >
            Trocar de tema
          </button>
        </div>
      </header>
    </div>
  );
}
