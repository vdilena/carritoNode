
module.exports =(sequelize,type) =>{
    const Pedidos=  sequelize.define("carritos",{
        //Creo un foegenKey Auto increment
        pedidoId:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        estado: {
            // creo un estado en Proceso como estado de defecto // puede cambiarse luego con los endPoints
            type:type.STRING,
            defaultValue:"En proceso"
        },
        //Genero una hora en funcion a la base de datos 
        hora:{
            type: type.DATE,
            defaultValue: type.NOW()

        },
        tipoPago: type.STRING,
        precio:type.INTEGER,
        direccionEnvio:type.STRING,

        
       
    })

    return Pedidos
}