import express from 'express';
import db from '../db/connection.js';
import usuarioRoutes from '../routes/usuario.js';
import transferenciaRoutes from '../routes/transferencia.js';

class Server {

    constructor(){

        this.app = express();
        this.port = process.env.PORT || '8000';

        this.apiPaths = {
            usuarios: '/api/usuarios',
            transferencias: '/api/transferencias',
        }

        //métodos iniciales
        this.dbConnection();
        this.middlewares();
        this.routes();
    }

    async dbConnection(){
        try{
            await db.authenticate();
            console.log('Database Arriba')

        }catch (error){
            throw new Error(error)
        }
    }

    middlewares(){
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes(){
        this.app.use(this.apiPaths.usuarios, usuarioRoutes)
        this.app.use(this.apiPaths.transferencias, transferenciaRoutes)
    }

    listen(){
        this.app.listen(this.port,()=>{
            console.log(`Servidor corriendo en el puerto--> ${this.port}`)
        })
    }
}

export default Server;