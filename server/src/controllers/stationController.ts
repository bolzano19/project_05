import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Station } from '../entity/Station';
import { Metric } from '../entity/Metric';

export const getStations = async (req: Request, res: Response) => {
  try {
    const stations = await getRepository(Station).find();
    res.json(stations);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const getStation = async (req: Request, res: Response) => {
  try {
    const station = await getRepository(Station).findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (!station) {
      return res.status(404).send('Station not found');
    }
    res.json(station);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const addStation = async (req: Request, res: Response) => {
  try {
    const station = await getRepository(Station).save(req.body);
    res.status(201).json(station);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const deleteStation = async (req: Request, res: Response) => {
  try {
    const station = await getRepository(Station).findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (!station) {
      return res.status(404).send('Station not found');
    }
    await getRepository(Station).remove(station);
    res.status(204).send();
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const updateStation = async (req: Request, res: Response) => {
  try {
    const station = await getRepository(Station).findOne({ where: { id: parseInt(req.params.id, 10) } });
    if (!station) {
      return res.status(404).send('Station not found');
    }
    getRepository(Station).merge(station, req.body);
    const result = await getRepository(Station).save(station);
    res.json(result);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500).send(errorMessage);
  }
};

export const getStationMetrics = async (req: Request, res: Response) => {
  try {
      const stationId = req.params.id;
      const station = await getRepository(Station).findOne({
        where: { id: parseInt(stationId, 10) },
        relations: ["metrics"]
      });

      if (!station) {
          return res.status(404).json({ message: 'Station not found' });
      }

      const metrics = station.metrics;
      res.json(metrics);
  } catch (error) {
      console.error('Error fetching station metrics:', error);
      const errorMessage = (error as Error).message;
      res.status(500).send(errorMessage);
  }
};
