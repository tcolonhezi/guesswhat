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
  const sizeClass =
    size === "small"
      ? "h-11 w-11 rounded-lg border border-brand text-xl font-medium"
      : "h-14 w-14 rounded-lg text-3xl font-bold";
  const colorClass =
    color === "correct"
      ? "border-success bg-success-soft text-success"
      : color === "wrong"
        ? "border-warning-ink bg-warning text-warning-ink"
        : "bg-brand-soft text-brand";

  return (
    <div
      className={`flex items-center justify-center uppercase ${sizeClass} ${colorClass}`}
    >
      <strong>{letter}</strong>
    </div>
  );
}
