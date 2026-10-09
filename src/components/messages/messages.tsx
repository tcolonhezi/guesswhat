import style from "./styles.module.css";

export function Messages({ children }: { children: React.ReactNode }) {
  return (
    <div className={style.overlay}>
      <div className={style.main}>{children}</div>
    </div>
  );
}
