import axios from "axios";
import { useEffect, useState } from "react";

import { Employee } from "@/models/employees";
import styles from "./employeesList.module.css";
import Link from "next/link";

const EmployeeList = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("/api/proxy/");
        setEmployees(response.data);
      } catch (error) {
        console.error("Error fetching employees", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className={styles.employeeList}>
      {employees.map((employee) => (
        <div key={employee.id} className={styles.employeeItem}>
          <h2>
            {employee.name} {employee.lastname}
          </h2>
          <p className={styles.document}>
            Document: {employee.documentType} {employee.documentNumber}
          </p>
          <p className={styles.startTime}>Start Time: {employee.startTime}</p>
          <p className={styles.endTime}>End Time: {employee.endTime}</p>
          <p className={styles.status}>Status: {employee.status}</p>
          <Link className={styles.button} href={`/empleados/${employee.id}`}>
            Modificar horarios
          </Link>
        </div>
      ))}
    </div>
  );
};

export default EmployeeList;
