import CheckIn from "../checkIn/checkIn";
import CheckOut from "../checkOut/checkOut";
import Image from "next/image";

import styles from './cardEmployee.module.css';

interface CardEmployeeProps {
  idEmployee: string;
  name: string;
  lastname: string;
  pathImage: string;
  status: string;
  fetchEmployees: () => void;
}

export default function CardEmployee({
  idEmployee,
  name,
  lastname,
  pathImage,
  status,
  fetchEmployees
}: CardEmployeeProps) {
  return (
    <div className={styles.cardEmployee}>
      <Image src={pathImage} width={150} height={150} alt={name} />
      <h3>{name} {lastname}</h3>
      <h4>{status}</h4>
      <div className={styles.warpButtons}>
        <CheckIn onCheckIn={fetchEmployees} idEmployee={idEmployee} status={status}></CheckIn>
        <CheckOut onCheckOut={fetchEmployees} idEmployee={idEmployee} status={status}></CheckOut>
      </div>
    </div>
  );
}
