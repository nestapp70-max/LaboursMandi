import { Request, Response } from 'express';
import { db } from '../db/drizzle.config';
import { wallets } from '../db/schema';
import { v4 as uuidv4 } from 'uuid';

export const getWallet = async (req: Request, res: Response) => {
  const { userId } = req.params;
  let wallet = await db.select().from(wallets).where(wallets.userId.eq(userId));
  if (!wallet.length) {
    const id = uuidv4();
    await db.insert(wallets).values({ id, userId, balance: 0 });
    wallet = await db.select().from(wallets).where(wallets.userId.eq(userId));
  }
  res.json(wallet[0]);
};

export const rechargeWallet = async (req: Request, res: Response) => {
  const { userId, amount } = req.body;
  const wallet = await db.select().from(wallets).where(wallets.userId.eq(userId));
  if (!wallet.length) return res.status(404).json({ error: 'Wallet not found' });

  const newBalance = Number(wallet[0].balance) + Number(amount);
  await db.update(wallets).set({ balance: newBalance }).where(wallets.userId.eq(userId));
  res.json({ ok: true, balance: newBalance });
};
