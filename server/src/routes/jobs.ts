import express from 'express';
import { postJob, getJobsByCustomer } from '../controllers/jobController';

export const jobRouter = express.Router();

jobRouter.post('/', postJob);
jobRouter.get('/customer/:customerId', getJobsByCustomer);
