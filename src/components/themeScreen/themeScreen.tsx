import { useState } from "react";
import styles from "./styles.module.css";

type ThemeScreenProps = {
  themes: string[];
  onSelect: (theme: string) => void;
};

function ThemeScreen({ themes, onSelect }: ThemeScreenProps) {
  const [selectedTheme, setSelectedTheme] = useState("");

  function handleContinue() {
    if (!selectedTheme) return;
    onSelect(selectedTheme);
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.main}>
        <h1>Selecione um dos temas abaixo.</h1>
        <h2>Será utilizado a inteligência artificial para a criação.</h2>
        <div className={styles.themes}>
          {themes.map((t) => {
            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTheme(t)}
                className={`${styles.themeCard} ${selectedTheme === t ? styles.selected : ""}`}
                aria-pressed={selectedTheme === t}
              >
                {t}
              </button>
            );
          })}
        </div>
        <button
          className={styles.buttonContinuar}
          disabled={!selectedTheme}
          onClick={handleContinue}
        >
          Continuar
        </button>
      </div>
    </div>
  );
}

export { ThemeScreen };
