import { Request, Response } from 'express';
import { db } from '../db/drizzle.config';
import { users, otp_codes } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';

export const sendOtp = async (req: Request, res: Response) => {
  const { phone } = req.body;
  const code = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5*60*1000); // 5 min

  await db.insert(otp_codes).values({
    id: uuidv4(),
    phone,
    code,
    expiresAt
  });

  console.log(`DEV OTP for ${phone}: ${code}`);
  res.json({ ok: true, message: 'OTP sent (dev mode, check server log)' });
};

export const verifyOtp = async (req: Request, res: Response) => {
  const { phone, code } = req.body;

  const otp = await db.select().from(otp_codes).where(otp_codes.phone.eq(phone)).orderBy(otp_codes.createdAt.desc()).limit(1);

  if (!otp.length || otp[0].code !== code || otp[0].expiresAt < new Date()) {
    return res.status(400).json({ error: 'Invalid or expired OTP' });
  }

  let user = await db.select().from(users).where(users.phone.eq(phone));

  if (!user.length) {
    return res.status(404).json({ error: 'User not found, signup first' });
  }

  const token = jwt.sign({ id: user[0].id, role: user[0].role }, process.env.JWT_SECRET!, { expiresIn: '7d' });
  res.json({ token, user: user[0] });
};

export const signup = async (req: Request, res: Response) => {
  const { name, phone, role } = req.body;
  const id = uuidv4();

  await db.insert(users).values({
    id,
    name,
    phone,
    role
  });

  res.json({ id, name, phone, role });
};
