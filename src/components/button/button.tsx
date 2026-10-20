interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
}

export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button
      className="rounded-lg border-2 border-brand-dark bg-brand px-1 font-bold text-white"
      {...rest}
    >
      {text}
    </button>
  );
}
