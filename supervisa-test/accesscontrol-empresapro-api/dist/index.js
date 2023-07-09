"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const employees_1 = require("./routes/employees");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/api', employees_1.router);
app.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
});