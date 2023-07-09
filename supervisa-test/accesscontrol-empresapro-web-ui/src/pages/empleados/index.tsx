import EmployeeList from '@/components/employeesList/employeesList'
import styles from '@/styles/employees.module.css'

export default function Empleados() {
  return (
    <main>
      <section className={styles.wrapList}>
        <h1>Empleados</h1>
        <EmployeeList></EmployeeList>
      </section>
    </main>
  )
}
