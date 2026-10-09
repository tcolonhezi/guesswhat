import styles from "./styles.module.css";
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
    <div className={styles.container}>
      <img src={logo} alt="Logo Adivinhe" />
      <header>
        <span>
          <strong>{current}</strong> de {max} tentativas
        </span>
        <div className={styles.actions}>
          <button className={styles.button} type="button" onClick={onRestart}>
            Reiniciar
          </button>
          <button
            className={styles.button}
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
