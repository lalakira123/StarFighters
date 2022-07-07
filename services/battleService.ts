import axios, { AxiosResponse } from 'axios';

import * as fightersRepository from './../repositories/fightersRepository.js';
import { notFound } from './../middlewares/errorHandlerMiddleware.js';

async function checkUser(user: string) {
    const api = `https://api.github.com/users/${user}/repos`;

    try{
        const response : AxiosResponse = await axios.get(api);

        const fighter = await fightersRepository.findFighter(user);
        if( fighter.rowCount === 0 ){
            await fightersRepository.insertFighter(user);
        }
        
        const numberOfStars = countStars(response.data);

        return numberOfStars;
    } catch(error){
        if(error){
            throw notFound();
        }
    }
}

function countStars(dataArray : []) {
    let countStar : number = 0;

    dataArray.forEach((repo : {stargazers_count:number}) => countStar += repo.stargazers_count);
    
    return countStar;
}

async function battle( firstUser: string, secondUser: string, numberOfStarsUser1: number, numberOfStarsUser2: number ) {
    let winner:string|null;
    let loser:string|null;
    let draw:boolean;

    if( numberOfStarsUser1 > numberOfStarsUser2 ){
        winner = firstUser;
        loser = secondUser;
        draw = false;
    } else if( numberOfStarsUser1 < numberOfStarsUser2 ){
        winner = secondUser;
        loser = firstUser;
        draw = false;
    } else if( numberOfStarsUser1 === numberOfStarsUser2 ){
        winner = null;
        loser = null;
        draw = true;
    }

    if( draw ){
        await fightersRepository.updateDrawStatusFighter(firstUser);
        await fightersRepository.updateDrawStatusFighter(secondUser);
    } else {
        await fightersRepository.updateWinStatusFighter(winner);
        await fightersRepository.updateLossStatusFighter(loser);
    }

    return {
        winner,
        loser,
        draw
    }
}

export {
    checkUser,
    battle
}