import styles from "./header.module.css";

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>Empresa PRO</h1>
      <p className={styles.slogan}>Dashboard de Administración de Empleados</p>
    </header>
  );
};
