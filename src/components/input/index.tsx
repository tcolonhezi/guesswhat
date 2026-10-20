type Props = React.ComponentProps<"input">;

export default function Input({ ...rest }: Props) {
  return (
    <input
      className="h-14 w-14 rounded-[0.43rem] border-2 border-brand bg-brand-soft text-center text-base font-bold uppercase text-brand outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2"
      type="text"
      {...rest}
    />
  );
}
