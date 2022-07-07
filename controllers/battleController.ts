import { Request, Response } from 'express';
import * as battleService from './../services/battleService.js';

export async function battle(req: Request, res: Response) {
    const { firstUser, secondUser } : {firstUser: string, secondUser: string} = req.body;

    const numberOfStarsUser1 = await battleService.checkUser(firstUser);
    const numberOfStarsUser2 = await battleService.checkUser(secondUser);
    
    const resultBattle = await battleService.battle(firstUser, secondUser, numberOfStarsUser1, numberOfStarsUser2); 
        
    res.send(resultBattle);
}