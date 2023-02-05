import express, { Router, Request, Response } from 'express';
import v1 from './v1';

const router = express.Router();

router.get("/", (req: Request, res: Response): void => {
    res.send("This is the root route - a.k.a. I'm alive!!!")
});

router.use('/v1', v1);

// 404 routes
router.all('*', (req: Request, res: Response): void => {
    const errorMessage = {
        message: 'The requested route was not found, please use a valid route:',
        endpoints: {
            signup: 'POST /v1/user/signup',
            login: 'POST /v1/auth/login'
        },
        success: false
    }
    res.status(404).json(errorMessage)
})

export default router;