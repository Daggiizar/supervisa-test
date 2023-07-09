import Employee from "@/components/employee/employee";
import styles from "@/styles/employees.module.css";
import { Toaster } from "react-hot-toast";

export default function Empleados() {
  return (
    <main>
      <section className={styles.wrapList}>
        <h1>Editar horario del empleado</h1>
        <Toaster></Toaster>
        <Employee></Employee>
      </section>
    </main>
  );
}
