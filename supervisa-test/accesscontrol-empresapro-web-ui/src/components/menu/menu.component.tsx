import { useRouter } from 'next/router'
import Link from 'next/link'
import styles from "./menu.module.css";

export const Menu = () => {
  const router = useRouter();

  return (
    <ul className={styles.sidebar}>
      <li className={styles.menuItem}>
        <Link href="/tablero">
          <p className={router.pathname === "/tablero" ? styles.activeItem : styles.item}>
            Tablero de Tráfico
          </p>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link href="/empleados">
          <p className={router.pathname === "/empleados" ? styles.activeItem : styles.item}>
            Empleados
          </p>
        </Link>
      </li>
      <li className={styles.menuItem}>
        <Link href="/registro">
          <p className={router.pathname === "/registro" ? styles.activeItem : styles.item}>
            Registro
          </p>
        </Link>
      </li>
    </ul>
  );
};
