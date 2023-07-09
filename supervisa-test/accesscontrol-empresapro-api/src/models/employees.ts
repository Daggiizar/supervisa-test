export class Employee {
  id: string;
  name: string;
  lastname: string;
  documentType: string;
  documentNumber: string;
  status: string;
  startTime: string;
  endTime: string;

  constructor(
    id: string,
    name: string,
    lastname: string,
    documentType: string,
    documentNumber: string,
    status: string,
    startTime: string,
    endTime: string
  ) {
    this.id = id;
    this.name = name;
    this.lastname = lastname;
    this.documentType = documentType;
    this.documentNumber = documentNumber;
    this.status = status;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
