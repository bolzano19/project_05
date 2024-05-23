import { DataSource } from 'typeorm';
import { Station } from './entity/Station';
import { Metric } from './entity/Metric';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "misha",
    password: "123456",
    database: "stations_and_metrics",
    synchronize: true,
    logging: false,
    entities: [Station, Metric],
    migrations: [],
    subscribers: [],
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization:', err);
  });
