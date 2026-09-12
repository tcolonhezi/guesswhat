import styles from "./styles.module.css";

type LetterProps = {
  letter?: string;
  size?: "default" | "small";
  color?: "default" | "correct" | "wrong";
};

export default function Letter({
  letter = "",
  color = "default",
  size = "default",
}: LetterProps) {
  return (
    <div
      className={`
        ${styles.container}
        ${size === "small" ? styles.letterSmall : ""}
        ${color === "correct" ? styles.letterCorrect : ""}
        ${color === "wrong" ? styles.letterWrong : ""}
      `}
    >
      <strong>{letter}</strong>
    </div>
  );
}
