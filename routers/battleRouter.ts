import { Router } from 'express';

import validateSchema from './../middlewares/schemaValidationMiddleware.js';
import usersSchema from './../schemas/usersSchema.js';

import { battle } from './../controllers/battleController.js';

const battleRouter = Router();

battleRouter.post('/battle', validateSchema(usersSchema), battle);

export default battleRouter;
