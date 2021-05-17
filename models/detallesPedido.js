
module.exports =(sequelize,type) =>{
    const DetallesPedido=  sequelize.define("detallesPedido",{
        //Creo un foegenKey Auto increment
        detallePedidoId:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        cantidad:type.INTEGER, 
    })

    return DetallesPedido
}