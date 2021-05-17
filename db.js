const  Sequelize  = require("sequelize");
const PedidoModel = require("./models/pedido");
const ProductoModel = require("./models/productos");
const ProductoPedidoModel = require("./models/productoPedido");

const DetallesPedidoModel = require("./models/detallesPedido");

const UserModel = require("./models/users");
const pedido = require("./models/pedido");
const path = 'mysql://root@localhost:3306/delilah_resto';





const sequelize_ruta = new Sequelize(path,{
    host:"localhost",
    dialect: "mssql"

})
const productoPedido = ProductoPedidoModel(sequelize_ruta,Sequelize);

//Producto contiene el modelo de productos , como primer parametro la ruta, y como segundo parametro el modulo de Sequelize
const Producto = ProductoModel(sequelize_ruta,Sequelize);
//User contiene el modelo de productos , como primer parametro la ruta, y como segundo parametro el modulo de Sequelize
const User = UserModel(sequelize_ruta,Sequelize);
//Pedido contiene el modelo de productos , como primer parametro la ruta, y como segundo parametro el modulo de Sequelize
const Pedido = PedidoModel(sequelize_ruta,Sequelize);

const DetallesPedido = DetallesPedidoModel(sequelize_ruta,Sequelize);


//Asociaciones 
// el pedido tiene un usuario 
//añadir una claver foraea del tipo user id
 
Pedido.belongsTo(User);
Pedido.belongsTo(Producto);
Pedido.belongsTo(productoPedido);

DetallesPedido.belongsTo(Pedido);
DetallesPedido.belongsTo(Producto);
 
/* Producto.belongsToMany(productoPedido, { through: productoPedido });
productoPedido.belongsToMany(Producto, { through: productoPedido }); */
productoPedido.belongsTo(User);
productoPedido.belongsTo(Producto);




//Simplemente sincronizo las tablas
sequelize_ruta.sync({force :false})
.then(()=>{
    console.log("tablas sincronizadas");
})
module.exports ={
    Producto,
    User,
    Pedido,
    productoPedido,
    DetallesPedido
}