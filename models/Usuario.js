import { DataTypes } from "sequelize"
import db from '../db/connection.js';
import {Transferencia} from './Transferencia.js';

export const Usuario = db.define('usuarios',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    nombre:{
        type:DataTypes.STRING
    },
    balance:{
        type:DataTypes.FLOAT
    }

},
{
    timestamps:true
}
)


Usuario.hasMany( Transferencia,{
    foreignKey:'emisor',
    sourceKey:'id',
})

Usuario.hasMany( Transferencia,{
    foreignKey:'receptor',
    sourceKey:'id'
})

Transferencia.belongsTo(Usuario,{
    foreignKey:'emisor',
    targetKey:'id',
    as: 'emisordata'
})
Transferencia.belongsTo(Usuario,{
    foreignKey:'receptor',
    targetKey:'id',
    as: 'receptordata'
})

export default Usuario;