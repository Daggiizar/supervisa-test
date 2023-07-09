import express, { Router } from 'express';
import { getAllEmployees, getEmployeeById, createEmployee, updateEmployee, employeeCheckIn, employeeCheckOut } from '../controllers/employeesController';
import { getAllCheckIns } from '../controllers/checkinsController';

export const router: Router = express.Router();

router.get('/employees', getAllEmployees);
router.get('/employee', getEmployeeById);
router.get('/checkins', getAllCheckIns);
router.post('/employee', createEmployee);
router.put('/employee/:id', updateEmployee);
router.put('/checkin/:id', employeeCheckIn);
router.put('/checkout/:id', employeeCheckOut);

