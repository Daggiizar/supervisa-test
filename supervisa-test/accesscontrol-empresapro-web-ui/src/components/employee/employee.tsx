import { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/router";
import styles from "./employee.module.css";

const EditEmployee = () => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [identification, setIdentification] = useState("");
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchEmployeeData = async () => {
        try {
          const response = await fetch(
            `http://localhost:3000/api/employee?id=${id}`
          );
          const data = await response.json();

          setStartTime(data.startTime);
          setEndTime(data.endTime);
          setName(data.name);
          setLastname(data.lastname);
          setIdentification(data.documentNumber);
        } catch (error) {
          toast.error("Error al cargar los datos del empleado", {
            position: "top-right",
          });
        }
      };

      fetchEmployeeData();
    }
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:3000/api/employee/${id}`, {
        startTime,
        endTime,
      });

      toast.success("Modificación exitosa", { position: "top-right" });
      setTimeout(() => {
        router.push('/empleados')
      }, 1000)
    } catch (error) {
      toast.error("Error al realizar la modificación", {
        position: "top-right",
      });
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2>
        <small>{name} </small>
        {lastname}
      </h2>
      <h3>
        <small>Número de documento: </small>
        {identification}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className={styles.warpForm}>
          <label>
            Hora de entrada:
            <input
              type="text"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </label>
          <label>
            Hora de salida:
            <input
              type="text"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </label>
        </div>
        <button className={styles.button} type="submit">
          Guardar
        </button>
      </form>
    </div>
  );
};

export default EditEmployee;
