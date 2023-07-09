import { Timestamp } from '@google-cloud/firestore';

export class CheckIn {
  employeeId: string;
  name: string;
  lastname: string;
  documentNumber: string;
  checkIn: Date | Timestamp;
  checkOut?: Date | Timestamp;

  constructor(
    employeeId: string,
    name: string,
    lastname: string,
    documentNumber: string,
    checkIn: Date | Timestamp,
    checkOut?: Date | Timestamp
  ) {
    this.employeeId = employeeId;
    this.name = name;
    this.lastname = lastname;
    this.documentNumber = documentNumber;
    this.checkIn = checkIn;
    this.checkOut = checkOut;
  }
}
