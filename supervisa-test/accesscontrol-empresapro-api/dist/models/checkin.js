"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CheckIn = void 0;
class CheckIn {
    constructor(employeeId, name, documentNumber, checkIn, date, checkOut) {
        this.employeeId = employeeId;
        this.name = name;
        this.documentNumber = documentNumber;
        this.checkIn = checkIn;
        this.date = date;
        this.checkOut = checkOut;
    }
}
exports.CheckIn = CheckIn;
