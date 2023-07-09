"use strict";
// controllers/employeesController.ts
Object.defineProperty(exports, "__esModule", { value: true });
exports.employeeCheckOut = exports.employeeCheckIn = exports.updateEmployee = exports.createEmployee = exports.getEmployeeById = exports.getAllEmployees = void 0;
const firebase_1 = require("../db/firebase");
const employees_1 = require("../models/employees");
const checkins_1 = require("../models/checkins");
const getAllEmployees = (req, res) => {
    firebase_1.db.collection("employees")
        .get()
        .then((snapshot) => {
        let employees = [];
        snapshot.forEach((doc) => {
            const employee = doc.data();
            employee.id = doc.id;
            employees.push(employee);
        });
        res.json(employees);
    })
        .catch((err) => res.status(500).json(err));
};
exports.getAllEmployees = getAllEmployees;
const getEmployeeById = (req, res) => {
    const id = req.params.id;
    firebase_1.db.collection("employees")
        .doc(id)
        .get()
        .then((doc) => {
        if (!doc.exists) {
            res.status(404).json({ message: "Employee not found" });
        }
        else {
            const employee = doc.data();
            employee.id = doc.id;
            res.json(employee);
        }
    })
        .catch((err) => res.status(500).json(err));
};
exports.getEmployeeById = getEmployeeById;
const createEmployee = (req, res) => {
    const { name, lastname, documentType, documentNumber, status, startTime, endTime, } = req.body;
    const newEmployee = new employees_1.Employee("", name, lastname, documentType, documentNumber, status, startTime, endTime);
    firebase_1.db.collection("employees")
        .add(Object.assign({}, newEmployee))
        .then((docRef) => {
        newEmployee.id = docRef.id;
        res.json(newEmployee);
    })
        .catch((err) => res.status(500).json(err));
};
exports.createEmployee = createEmployee;
const updateEmployee = (req, res) => {
    const id = req.params.id;
    const { name, lastname, documentType, documentNumber, status, startTime, endTime, } = req.body;
    firebase_1.db.collection("employees")
        .doc(id)
        .update({
        name,
        lastname,
        documentType,
        documentNumber,
        status,
        startTime,
        endTime,
    })
        .then(() => res.json({ message: "Employee updated successfully" }))
        .catch((err) => res.status(500).json(err));
};
exports.updateEmployee = updateEmployee;
const employeeCheckIn = (req, res) => {
    const id = req.params.id;
    console.log("ID:", id);
    firebase_1.db.collection("employees")
        .doc(id)
        .get()
        .then((doc) => {
        if (!doc.exists) {
            console.log("Document does not exist");
            res.status(404).json({ message: "Employee not found" });
        }
        else {
            const employee = doc.data();
            const currentHour = new Date().getHours();
            console.log("Employee:", employee);
            console.log("Current hour:", currentHour);
            if (currentHour >= parseInt(employee.startTime) &&
                currentHour < parseInt(employee.endTime)) {
                employee.status = "WORKING";
                const checkInTime = new Date();
                const checkInEntry = new checkins_1.CheckIn(id, employee.name, employee.documentNumber, checkInTime, new Date(checkInTime.setHours(0, 0, 0, 0)));
                console.log("Checkin entry:", checkInEntry);
                firebase_1.db.collection("checkins")
                    .add(Object.assign({}, checkInEntry))
                    .then(() => res.json({ message: "Check-in successful", checkInEntry }))
                    .catch((err) => {
                    console.log("Error adding document:", err);
                    res.status(500).json(err);
                });
            }
            else {
                employee.status = "OUT_OF_WORK";
                res
                    .status(403)
                    .json({ message: "Check-in failed, out of work hours" });
            }
        }
    })
        .catch((err) => {
        console.log("Error getting document:", err);
        res.status(500).json(err);
    });
};
exports.employeeCheckIn = employeeCheckIn;
const employeeCheckOut = (req, res) => {
    const id = req.params.id;
    firebase_1.db.collection("employees")
        .doc(id)
        .get()
        .then((doc) => {
        if (!doc.exists) {
            res.status(404).json({ message: "Employee not found" });
        }
        else {
            const employee = doc.data();
            const currentHour = new Date().getHours();
            if (currentHour >= parseInt(employee.startTime) &&
                currentHour < parseInt(employee.endTime)) {
                employee.status = "OUT_OF_WORK";
                const checkOutTime = new Date();
                const todayMidnight = new Date(checkOutTime.setHours(0, 0, 0, 0));
                firebase_1.db.collection("checkins")
                    .where("employeeId", "==", id)
                    .where("date", "==", todayMidnight)
                    .get()
                    .then((snapshot) => {
                    if (!snapshot.empty) {
                        let docRef = snapshot.docs[0].ref;
                        docRef
                            .update({ checkOut: checkOutTime })
                            .then(() => res.json({ message: "Check-out successful", employee }))
                            .catch((err) => res.status(500).json(err));
                    }
                    else {
                        res.status(403).json({
                            message: "Check-out failed, no corresponding check-in found",
                        });
                    }
                })
                    .catch((err) => res.status(500).json(err));
            }
            else {
                res
                    .status(403)
                    .json({ message: "Check-out failed, out of work hours" });
            }
        }
    })
        .catch((err) => res.status(500).json(err));
};
exports.employeeCheckOut = employeeCheckOut;
