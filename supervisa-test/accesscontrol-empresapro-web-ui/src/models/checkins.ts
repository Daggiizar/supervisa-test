export interface CheckIn {
  lastname: string;
  documentNumber: string;
  name: string;
  checkOut: any;
  employeeId: string;
  checkIn: string;
}

export interface GroupedCheckIn {
  date: string;
  checkIns: CheckIn[];
}