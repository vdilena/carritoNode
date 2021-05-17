
module.exports =(sequelize,type) =>{
    const productoPedido=  sequelize.define("productoPedido",{
        //Creo un foegenKey Auto increment
        productoPedidoId:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        }
        
       
    })

    return productoPedido
}