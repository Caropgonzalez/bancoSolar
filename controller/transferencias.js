import Transferencia from "../models/Transferencia.js";
import Usuario from "../models/Usuario.js";
import db from "../db/connection.js";

export const getTransferencias = async(req, res)=>{
    const transferencias = await Transferencia.findAll({
        order:[["id", "DESC"]],
        include: [
            {model: Usuario, as: 'emisordata'},
            {model: Usuario, as: 'receptordata'}
        ]
    });
    res.json({transferencias})
}

export const getTransferencia = async (req, res)=>{
    const {id} = req.params
    const transferencia = await Transferencia.findByPk(id);
    if(transferencia){
        res.json(transferencia)
    }else{
        res.status(404).json({
            msg:`No existe la transferencia con el id ${id}`
        })
    }
}

export const postTransferencia = async (req, res)=>{
    const {emisor,receptor,monto} = req.body;
    const fecha = new Date();
    let transaction;
    try{
        transaction = await db.transaction();
        const nuevaTransferencia = await Transferencia.create({
            fecha,
            emisor,
            receptor,
            monto
        }, {transaction})
        await updateBalance(nuevaTransferencia, transaction, false);
        await transaction.commit(); 
        res.json(nuevaTransferencia)
    }catch(error){
        if(transaction) {
            await transaction.rollback();
         }
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
        console.log('salida de error',error)
    }
}

export const putTransferencia = async (req, res)=>{
    const {id} = req.params
    const {body} = req;
    let transaction;

    try{
        transaction = await db.transaction();
        const transferencia = await Transferencia.findByPk(id);
        if(!transferencia){
            return res.status(400).json({
                msg:`No existe la transferencia con el id ${id}`
            })
        }        
        await transferencia.update(body, {transaction});
        await updateBalance(transferencia, transaction, false);
        await transaction.commit();
        res.json(transferencia)
    }catch(error){
        if(transaction) {
            await transaction.rollback();
        }
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const deleteTransferencia = async (req, res)=>{
    const {id} = req.params
    const transferencia = await Transferencia.findByPk(id);
    let transaction;
    try{
        transaction = await db.transaction();
    
        if(!transferencia){
            return res.status(404).json({
                msg:`No existe la transferencia con el id ${id}`
            })
        }
        await updateBalance(transferencia, transaction, true);

        await transferencia.destroy({transaction})
        await transaction.commit();
        res.json(transferencia)
        
    }catch(error){
        if(transaction) {
            await transaction.rollback();
        }
    }
}

const updateBalance = async (transferencia, transaction, isDelete) => {
    const emisor = await Usuario.findByPk(transferencia.emisor)
    const receptor = await Usuario.findByPk(transferencia.receptor)

    if (!emisor || !receptor) {
        return false;
    }
    let montoEmisor = isDelete ? (emisor.balance + transferencia.monto) : (emisor.balance - transferencia.monto);
    let montoReceptor = isDelete ? (emisor.balance - transferencia.monto) : (emisor.balance + transferencia.monto);
    
    await emisor.update({balance: montoEmisor}, {transaction});
    await receptor.update({balance: montoReceptor + transferencia.monto}, {transaction});

}