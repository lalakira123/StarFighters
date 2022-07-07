import connection from './../config/db.js';

async function findFighter(name:string) {
    return await connection.query(`
        SELECT * FROM fighters 
        WHERE username = $1;
    `, [name]);
}

async function insertFighter(name:string) {
    return await connection.query(`
        INSERT INTO fighters (username, wins, losses, draws)
        VALUES ($1, 0, 0, 0);
    `, [name]);
}

async function updateWinStatusFighter(name:string) {
    return await connection.query(`
        UPDATE fighters 
        SET wins=wins+1
        WHERE username=$1 
    `, [name]);
}

async function updateLossStatusFighter(name:string) {
    return await connection.query(`
        UPDATE fighters 
        SET losses=losses+1
        WHERE username=$1 
    `, [name]);
}

async function updateDrawStatusFighter(name:string) {
    return await connection.query(`
        UPDATE fighters 
        SET draws=draws+1
        WHERE username=$1 
    `, [name]);
}

async function ranking() {
    return await connection.query(`
        SELECT * FROM fighters
        ORDER BY wins DESC, draws DESC;
    `);
}

export {
    findFighter,
    insertFighter,
    updateWinStatusFighter,
    updateLossStatusFighter,
    updateDrawStatusFighter,
    ranking
}