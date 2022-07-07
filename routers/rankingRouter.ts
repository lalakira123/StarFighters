import { Router } from 'express';

import { rankingFighters } from './../controllers/rankingController.js';

const rankingRouter = Router();

rankingRouter.get('/ranking', rankingFighters);

export default rankingRouter;