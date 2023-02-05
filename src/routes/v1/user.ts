import express, { Router, Request, Response } from "express";
import rpcClient from "../../btc/rpcClient";
// import { createUser } from '../../../helpers/validators/user';
// import { registerUser, userAddress, userBalance, userLogin } from '../../../controllers/user';
import { authUser } from '../../helpers/auth';

const router: Router = express.Router();

router.post('/register', createUser, registerUser);
router.post('/login', createUser, userLogin);

router.get('/address', async (req: Request, res: Response) => {
  return res.status(200).send("get address")
});

// router.get('/balance', authUser, userBalance);
  router.get('/balance', async (req: Request, res: Response) => {
    //@NOTE: get balance from rpc - dev test
    const info = await rpcClient.getBlockchainInfo();
    console.log(`🚀 ~ info ~ info`, info);
      return res.status(200).send(`get balance: ${info.blocks}` );
  });

export default router;