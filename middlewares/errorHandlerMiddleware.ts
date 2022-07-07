import { Request, Response, NextFunction } from 'express';

const serviceErrorToStatusCode = {
    notFound: 404
};

export function notFound() {
    return { type: "notFound" };
}

export default async function handleError(error, req:Request, res:Response, next:NextFunction) {
    if(error.type){
        res.sendStatus(serviceErrorToStatusCode[error.type]);
    }

    res.sendStatus(500);
}