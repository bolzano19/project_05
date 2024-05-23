import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Station } from '../entity/Station';
import { Metric } from '../entity/Metric';

function generateRandomNumber(min: number, max: number, lastValue: number | null): number {
    if (lastValue === null) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    } else {
        const low = Math.max(min, lastValue - 1);
        const high = Math.min(max, lastValue + 1);
        return Math.floor(Math.random() * (high - low + 1)) + low;
    }
}

export const getMetricsForStation = async (req: Request, res: Response) => {
    const stationId = parseInt(req.params.id);

    try {
        const station = await getRepository(Station).findOne(stationId);

        if (!station) {
            return res.status(404).send('Station not found');
        }

        if (!station.status) {
            return res.send({
                temperature: 0,
                dose_rate: 0,
                humidity: 0
            });
        }

        let lastTemperatureValue = 36;
        let lastDoseRateValue = 5;
        let lastHumidityValue = 75;

        const temperature = generateRandomNumber(10, 60, lastTemperatureValue);
        const doseRate = generateRandomNumber(0, 12, lastDoseRateValue);
        const humidity = generateRandomNumber(30, 90, lastHumidityValue);

        const metric = new Metric();
        metric.temperature = temperature;
        metric.dose_rate = doseRate;
        metric.humidity = humidity;
        metric.station = station;

        await getRepository(Metric).save(metric);

        return res.send(metric);
    } catch (error) {
        return res.status(500).send(error.message);
    }
};
