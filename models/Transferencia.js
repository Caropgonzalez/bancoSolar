import { DataTypes } from "sequelize";
import db from '../db/connection.js';

export const Transferencia = db.define('transferencias',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },emisor:{
        type:DataTypes.INTEGER,

    },
    receptor:{
        type:DataTypes.INTEGER,
    },
    monto:{
        type:DataTypes.FLOAT
    },
    fecha:{
        type:DataTypes.TIME
    }

},
{
    timestamps:true
}
)

export default Transferencia;
    
    