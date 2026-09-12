import styles from "./styles.module.css";

interface ButtonProps extends React.ComponentProps<"button"> {
  text: string;
}

export default function Button({ text, ...rest }: ButtonProps) {
  return (
    <button className={styles.container} {...rest}>
      {text}
    </button>
  );
}
