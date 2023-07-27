import { Sequelize } from "sequelize";

const db = new Sequelize('bancosolar', 'postgres', '2365',{
    host:'localhost',
    dialect:'postgres',
    logging:true
});




export default db