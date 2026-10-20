import { useEffect } from "react";
import type { LettersUsedProps } from "../lettersUsed/lettersUsed";

const ROWS = ["QWERTYUIOP", "ASDFGHJKL", "ZXCVBNM"];

type VirtualKeyboardProps = {
  /** Letras já usadas, no formato { letter: "A", correct: true } */
  lettersUsed: LettersUsedProps[];
  /** Chamado com a letra em maiúscula (A-Z) */
  onKeyPress: (letter: string) => void;
  /** Bloqueia o teclado (fim de jogo, por exemplo) */
  disabled?: boolean;
  /** Também escuta o teclado físico. Padrão: true */
  listenPhysicalKeyboard?: boolean;
};

/** "ç" -> "C", "á" -> "A". Retorna null se não for uma letra A-Z. */
function toBaseLetter(key: string): string | null {
  if (key.length !== 1) return null;
  const base = key
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
  return /^[A-Z]$/.test(base) ? base : null;
}

export default function VirtualKeyboard({
  lettersUsed,
  onKeyPress,
  disabled = false,
  listenPhysicalKeyboard = true,
}: VirtualKeyboardProps) {
  const statusOf = (letter: string) => {
    const used = lettersUsed.find((u) => u.letter === letter);
    if (!used) return "unused";
    return used.correct ? "correct" : "wrong";
  };

  useEffect(() => {
    if (!listenPhysicalKeyboard || disabled) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey || e.repeat) return;

      // Não captura quando a pessoa está digitando em outro campo
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable='true']")) return;

      const letter = toBaseLetter(e.key);
      if (!letter) return;
      if (statusOf(letter) !== "unused") return;

      onKeyPress(letter);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // statusOf depende de lettersUsed
  }, [listenPhysicalKeyboard, disabled, lettersUsed, onKeyPress]);

  return (
    <div
      role="group"
      aria-label="Teclado"
      className="mx-auto flex w-full max-w-xl flex-col gap-1.5 sm:gap-2"
    >
      {ROWS.map((row) => (
        <div key={row} className="flex justify-center gap-1.5 sm:gap-2">
          {row.split("").map((letter) => {
            const status = statusOf(letter);
            const isUsed = status !== "unused";

            return (
              <button
                key={letter}
                type="button"
                disabled={disabled || isUsed}
                onClick={() => onKeyPress(letter)}
                aria-label={
                  status === "correct"
                    ? `${letter}, letra certa`
                    : status === "wrong"
                      ? `${letter}, letra errada`
                      : letter
                }
                className={[
                  "h-11 min-w-0 flex-1 touch-manipulation rounded-md text-base font-bold transition-colors sm:h-12 sm:text-lg",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current",
                  status === "unused" &&
                    "bg-gray-200 text-gray-900 hover:bg-gray-300 active:bg-gray-400 disabled:opacity-50",
                  status === "correct" && "bg-green-600 text-white",
                  // Errada: além da cor, risca a letra (não depende só de cor)
                  status === "wrong" &&
                    "bg-gray-100 text-gray-400 line-through decoration-2",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
