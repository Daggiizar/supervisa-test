"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Employee = void 0;
class Employee {
    constructor(id, name, lastname, documentType, documentNumber, status, startTime, endTime) {
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
exports.Employee = Employee;
