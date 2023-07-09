// controllers/employeesController.ts

import { Request, Response } from "express";
import { db } from "../db/firebase";
import { Employee } from "../models/employees";
import { CheckIn } from "../models/checkins";

export const getAllEmployees = (req: Request, res: Response) => {
  db.collection("employees")
    .get()
    .then((snapshot) => {
      let employees: Employee[] = [];
      snapshot.forEach((doc) => {
        const employee = doc.data() as Employee;
        employee.id = doc.id;
        employees.push(employee);
      });
      res.json(employees);
    })
    .catch((err) => res.status(500).json(err));
};

export const getEmployeeById = (req: Request, res: Response) => {
  const id = req.query.id as string;

  db.collection("employees")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).json({ message: "Empleado no encontrado" });
      } else {
        const employee = doc.data() as Employee;
        employee.id = doc.id;
        res.json(employee);
      }
    })
    .catch((err) => res.status(500).json(err));
};

export const createEmployee = (req: Request, res: Response) => {
  const {
    name,
    lastname,
    documentType,
    documentNumber,
    status,
    startTime,
    endTime,
  } = req.body;

  const newEmployee = new Employee(
    "",
    name,
    lastname,
    documentType,
    documentNumber,
    status,
    startTime,
    endTime
  );

  db.collection("employees")
    .add(Object.assign({}, newEmployee))
    .then((docRef) => {
      newEmployee.id = docRef.id;
      res.json(newEmployee);
    })
    .catch((err) => res.status(500).json(err));
};

export const updateEmployee = (req: Request, res: Response) => {
  const id = req.params.id;
  const {
    name,
    lastname,
    documentType,
    documentNumber,
    status,
    startTime,
    endTime,
  } = req.body;

  db.collection("employees")
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
    .then(() => res.json({ message: "Actualización exitosa" }))
    .catch((err) => res.status(500).json(err));
};

export const employeeCheckIn = (req: Request, res: Response) => {
  const id = req.params.id;

  db.collection("employees")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).json({ message: "Empleado no encontrado" });
      } else {
        const employee = doc.data() as Employee;
        const currentHour = new Date().getHours();

        if (
          currentHour >= parseInt(employee.startTime) &&
          currentHour < parseInt(employee.endTime)
        ) {
          employee.status = "TRABAJANDO";

          const checkInTime = new Date();
          const checkInEntry = new CheckIn(
            id,
            employee.name,
            employee.lastname,
            employee.documentNumber,
            checkInTime
          );

          db.collection("employees")
            .doc(id)
            .update({ status: "TRABAJANDO" })
            .then(() => {
              db.collection("checkins")
                .add(Object.assign({}, checkInEntry))
                .then(() =>
                  res.json({
                    message: "Registro de ingreso exitoso",
                    checkInEntry,
                  })
                )
                .catch((err) => {
                  res.status(500).json(err);
                });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        } else {
          db.collection("employees")
            .doc(id)
            .update({ status: "FUERA DEL TRABAJO" })
            .then(() => {
              res
                .status(403)
                .json({
                  message:
                    "Fallo el registro de ingreso, fuera del horario laboral permitido",
                });
            })
            .catch((err) => {
              res.status(500).json(err);
            });
        }
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
};

export const employeeCheckOut = (req: Request, res: Response) => {
  const id = req.params.id;

  db.collection("employees")
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        res.status(404).json({ message: "Empleado no encontrado" });
      } else {
        const employee = doc.data() as Employee;
        if (employee.status === "TRABAJANDO") {
          const checkOutTime = new Date();
          db.collection("checkins")
            .where("employeeId", "==", id)
            .get()
            .then((snapshot) => {
              if (!snapshot.empty) {
                let docRef = snapshot.docs[0].ref;
                docRef
                  .update({ checkOut: checkOutTime })
                  .then(() => {
                    db.collection("employees")
                      .doc(id)
                      .update({ status: "FUERA DEL TRABAJO" })
                      .then(() =>
                        res.json({ message: "Registro de salida exitoso", employee })
                      )
                      .catch((err) => res.status(500).json(err));
                  })
                  .catch((err) => res.status(500).json(err));
              } else {
                res.status(403).json({
                  message: "Fallo el registro de salida, no se encontró el registro de ingreso correspondiente",
                });
              }
            })
            .catch((err) => res.status(500).json(err));
        } else {
          res
            .status(403)
            .json({ message: "Fallo el registro de salida, No existe registro de ingreso" });
        }
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
};

