import express from 'express';
import { getWallet, rechargeWallet } from '../controllers/walletController';

export const walletRouter = express.Router();

walletRouter.get('/:userId', getWallet);
walletRouter.post('/recharge', rechargeWallet);
