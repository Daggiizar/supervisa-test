import CardEmployee from "@/components/cardEmployee/cardEmployee";
import { Employee } from "@/models/employees";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import styles from "@/styles/register.module.css";

export default function RegistrationPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    fetch("http://localhost:3000/api/employees")
      .then((response) => response.json())
      .then((data) => setEmployees(data))
      .catch((error) => console.error("Error:", error));
  };

  useEffect(() => {
    fetchEmployees();
  }, []);


  return (
    <div>
      <Toaster></Toaster>
      <h1>Página de Registro</h1>
      <div className={styles.wrapCards}>
        {employees.map((employee) => (
          <CardEmployee
            key={employee.id}
            idEmployee={employee.id}
            name={employee.name}
            lastname={employee.lastname}
            pathImage="/default-image-employee.png"
            status={employee.status}
            fetchEmployees={fetchEmployees}
          />
        ))}
      </div>
    </div>
  );
}
