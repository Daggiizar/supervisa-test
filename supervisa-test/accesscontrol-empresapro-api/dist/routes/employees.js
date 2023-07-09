"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const employeesController_1 = require("../controllers/employeesController");
const checkinsController_1 = require("../controllers/checkinsController");
exports.router = express_1.default.Router();
exports.router.get('/employees', employeesController_1.getAllEmployees);
exports.router.get('/employee/:id', employeesController_1.getEmployeeById);
exports.router.get('/checkins', checkinsController_1.getAllCheckIns);
exports.router.post('/employee', employeesController_1.createEmployee);
exports.router.put('/employee/:id', employeesController_1.updateEmployee);
exports.router.put('/checkin/:id', employeesController_1.employeeCheckIn);
exports.router.put('/checkout/:id', employeesController_1.employeeCheckOut);
