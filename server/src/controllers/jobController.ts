import { Request, Response } from 'express';
import { db } from '../db/drizzle.config';
import { jobs } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';

export const postJob = async (req: Request, res: Response) => {
  const { customerId, title, description, category, city, pincode, budget } = req.body;
  const id = uuidv4();

  const result = await db.insert(jobs).values({
    id, customerId, title, description, category, city, pincode, budget
  });

  res.json({ ok: true, jobId: id });
};

export const getJobsByCustomer = async (req: Request, res: Response) => {
  const { customerId } = req.params;
  const jobList = await db.select().from(jobs).where(jobs.customerId.eq(customerId));
  res.json(jobList);
};
