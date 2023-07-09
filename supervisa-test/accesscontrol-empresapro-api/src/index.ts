import express, { Application } from 'express';
import { router as employeesRouter } from './routes/employees';
import cors from 'cors';

const app: Application = express();

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: '*',
  credentials: true,
  preflightContinue: true,
};

app.use(cors(corsOptions));

app.use(express.json());
app.use('/api', employeesRouter);

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
