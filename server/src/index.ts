import express from 'express';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import stationRoutes from './routes/stationRoutes';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

app.use(express.json());
app.use('/', stationRoutes);

createConnection().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
}).catch(error => console.log(error));

