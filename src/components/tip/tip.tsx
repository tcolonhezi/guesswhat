import tipSvg from "../../assets/tip.svg";

type Props = {
  tip: string;
};

export default function Tip({ tip }: Props) {
  return (
    <div className="flex items-center gap-4 rounded-[0.62rem] bg-brand-soft p-4 text-brand-dark">
      <img className="h-8" src={tipSvg} alt="Ícone de dica" />
      <div>
        <h3 className="text-xl font-bold">Dica</h3>
        <p className="mt-[0.31rem] text-base">{tip}</p>
      </div>
    </div>
  );
}
