import styles from "./styles.module.css";
import tipSvg from "../../assets/tip.svg";

type Props = {
  tip: string;
};

export default function Tip({ tip }: Props) {
  return (
    <div className={styles.container}>
      <img src={tipSvg} alt="Ícone de dica" />
      <div>
        <h3>Dica</h3>
        <p>{tip}</p>
      </div>
    </div>
  );
}
