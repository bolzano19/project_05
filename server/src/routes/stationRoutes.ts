import { Router } from 'express';
import { getStations, getStation, addStation, deleteStation, updateStation, getStationMetrics } from '../controllers/stationController';

const router = Router();

router.get('/stations', getStations);
router.get('/stations/:id', getStation);
router.post('/stations', addStation);
router.delete('/stations/:id', deleteStation);
router.put('/stations/:id', updateStation);

router.get('/stations/:id/metrics', getStationMetrics);

export default router;

