import Usuario from '../models/Usuario.js';
import Transferencia from '../models/Transferencia.js';
import db from '../db/connection.js';
import { Sequelize} from 'sequelize';

export const getUsuarios = async (req, res)=>{
    const usuarios = await Usuario.findAll();
    res.json({usuarios})
}

export const getUsuario = async (req, res)=>{
    const {id} = req.params
    //********************************¿¿¿¿¿ID????? */
    const usuario = await Usuario.findByPk(id);
    if(usuario){
        res.json(usuario)
    }else{
        res.status(404).json({
            msg:`No existe el usuario con el id ${id}`
        })
    }
}

export const postUsuario = async(req, res)=>{

    const {body} = req;

    try{
        const existeUsuario = await Usuario.findOne({
            where:{
                nombre: body.nombre
            }
        })

        if(existeUsuario){
            return res.status(400).json({
                msg:`Ya existe el nombre del usuario ${body.nombre}`
            })
        }

        const usuario = new Usuario (body)
        await usuario.save();
        res.json(usuario)
    }catch(error){
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const putUsuario = async (req, res) =>{
    const {id} = req.params
    console.log('salida de id putUsuario--->', id)
    const { body} = req;

    try{              
        const usuario = await Usuario.findByPk(id);
        if(!usuario){
            return res.status(404).json({
                msg:`No existe el usuario con el id ${usuario}`
            })
        }
        await usuario.update(body);
        res.json(usuario)
    } catch(error){
        res.status(500).json({
            msg:'Se ha producido un error, comuniquese con el administrador'
        })
    }
}

export const deleteUsuario = async (req, res) =>{
    const {id} = req.params

    const usuario = await Usuario.findByPk(id);

    if(!usuario){
        return res.status(400).json({
            msg:`No existe el usuario con el id ${id}`
        })
    }
    await usuario.destroy()
    res.json(usuario)
}

export const actualizarSaldoUsuario = async (id, nuevoSaldo)=>{
    try{
        const usuario = await Usuario.findByPk(id);

        if(!usuario){
            throw new Error ('Usuario no encontrado.');
        }
        
        await usuario.update({saldo: nuevoSaldo});

        console.log('Saldo actualizado con éxito');
    }catch(error){
        console.log('Error al actualizar saldo del usuario', error)
    }finally{
        Sequelize.close();
    }
}
