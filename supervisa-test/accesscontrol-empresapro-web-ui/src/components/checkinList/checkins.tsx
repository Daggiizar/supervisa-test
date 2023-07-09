import React, { useEffect, useState } from "react";
import { GroupedCheckIn } from "@/models/checkins";
import styles from "./checkins.module.css";

const CheckInsComponent = () => {
  const [checkIns, setCheckIns] = useState<GroupedCheckIn[]>([]);

  useEffect(() => {
    const fetchCheckIns = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/checkins", {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          setCheckIns(data);
        } else {
          throw new Error("Error al obtener los check-ins");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchCheckIns();
  }, []);

  const formatDateTime = (date: Date | string): string => {
    const timestamp = new Date(date).getTime();
    const options = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };
    return new Date(timestamp).toLocaleString("es-ES", options as any);
  };

  const formatDateTimeCheckout = (timestamp: number): string => {
    const date = new Date(timestamp * 1000);
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    };

    const dateTimeString = date.toLocaleString("es-CO", dateOptions);

    return dateTimeString;
  };

  const formatDate = (isoString: string): string => {
    const date = new Date(isoString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("es-ES", options as any);
  };

  return (
    <div className={styles.checkInsContainer}>
      <h1 className={styles.checkInsHeading}>Lista de registros</h1>
      {checkIns.map((group, index) => (
        <div key={index}>
          <h3>{formatDate(group.date)}</h3>
          <ul className={styles.checkInsList}>
            {group.checkIns.map((checkIn) => (
              <li key={checkIn.employeeId} className={styles.checkInItem}>
                <div className={styles.checkInDetails}>
                  <p className={styles.checkInInfo}>
                    <span className={styles.infoLabel}>N. documento: </span>
                    {checkIn.documentNumber}
                  </p>
                  <p className={styles.checkInInfo}>
                    <span className={styles.infoLabel}>Nombre: </span>
                    {checkIn.name} {checkIn.lastname}
                  </p>
                  <p className={styles.checkInInfo}>
                    <span className={styles.infoLabel}>Entrada: </span>
                    {formatDateTime(checkIn.checkIn)}
                  </p>
                  <p className={styles.checkInInfo}>
                    <span className={styles.infoLabel}>Salida: </span>
                    {checkIn.checkOut
                      ? formatDateTimeCheckout(checkIn.checkOut._seconds)
                      : "No registra"}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default CheckInsComponent;
