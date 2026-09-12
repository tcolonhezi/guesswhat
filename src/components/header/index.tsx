import styles from "./styles.module.css";
import restart from "../../assets/restart.svg";
import logo from "../../assets/logo.png";

type Props = {
  current: number;
  max: number;
  onRestart: () => void;
};

export default function Header({ current, max, onRestart }: Props) {
  return (
    <div className={styles.container}>
      <img src={logo} alt="Logo Adivinhe" />
      <header>
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>
        <button type="button" onClick={onRestart}>
          <img src={restart} alt="Reiniciar jogo" />
        </button>
      </header>
    </div>
  );
}
