import express, {Router} from 'express';
import order from './order';
import user from './user';

const router: Router = express.Router();

router.use('/user', user);
router.use('/order', order);

export default router;
