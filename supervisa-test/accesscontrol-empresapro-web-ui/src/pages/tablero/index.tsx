import CheckInsComponent from '@/components/checkinList/checkins'
import styles from '@/styles/employees.module.css'

export default function Empleados() {
  return (
    <main>
      <section className={styles.wrapList}>
        <CheckInsComponent></CheckInsComponent>
      </section>
    </main>
  )
}
