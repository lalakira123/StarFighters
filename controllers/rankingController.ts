import { Request, Response } from 'express';

import * as fightersRepository from './../repositories/fightersRepository.js';

export async function rankingFighters(req:Request, res:Response){
    const ranking = await fightersRepository.ranking();

    res.send({
        fighters: ranking.rows
    });
} 