import { useState } from "react";

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
    <div className="fixed inset-0 z-10 flex flex-col items-center justify-center bg-black/75">
      <div className="mx-8 flex max-h-[calc(100vh_-_4rem)] w-[calc(100%_-_4rem)] flex-col items-center justify-center overflow-y-auto rounded-[2rem] bg-dialog p-8 sm:w-auto sm:p-16">
        <h1 className="text-center text-2xl font-bold">Selecione um dos temas abaixo.</h1>
        <h2 className="text-center text-base font-bold">
          Será utilizado a inteligência artificial para a criação.
        </h2>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-4">
          {themes.map((t) => {
            return (
              <button
                key={t}
                type="button"
                onClick={() => setSelectedTheme(t)}
                className={`min-h-[76px] rounded-[0.875rem] border-2 px-4 py-4 font-semibold text-theme-ink transition duration-200 hover:-translate-y-0.5 hover:border-focus focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus ${
                  selectedTheme === t
                    ? "border-theme-selected-border bg-theme-selected text-theme-selected-ink"
                    : "border-theme-border bg-theme-card"
                }`}
                aria-pressed={selectedTheme === t}
              >
                {t}
              </button>
            );
          })}
        </div>
        <button
          className="mt-8 h-[2.87rem] w-[6.62rem] rounded-lg border-2 border-brand-dark bg-brand px-[0.87rem] font-bold text-white focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-focus disabled:cursor-not-allowed disabled:opacity-60"
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
