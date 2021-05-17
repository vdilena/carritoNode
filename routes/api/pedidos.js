const router                    = require("express").Router();
const  sequelize                = require("sequelize");
const {Pedido }                  = require("../../db");
const {productoPedido}          =require("../../db");
const {User}                    = require("../../db");
const {Producto}                = require("../../db");
const {ProductoPedido}          = require("../../db");
const productos                 = require("../../models/productos");
var carrito                     =[];
const { QueryTypes }            = require('sequelize');
const middlewares               = require("../middlewares");
const jwt      = require("jwt-simple");

const {DetallesPedido}          =require("../../db");
var ultimoPedido = null;
const ROL_ADMIN = 1;



//Esta ruta es para obtener todos los pedidos Unicamente se puede tener acceso siendo administrador en el body se pone el rol =0 Usuario 1=Admin
router.get("/",middlewares.rol, async(req,res)=>{
    const pedidos =  await Pedido.findAll({
        attributes: ['pedidoId','estado','pedidoId','tipoPago'],
        include: [
            {
                model:User,
                attributes: ['id','username','email','direccion','numero']
            },{
                model:Producto,
                attributes: ['id','nombre','descripcion','precio']
            }
          ]
      });
    
    res.json(pedidos);
});

//Esta ruta es para ver los pedidos del Usuario unicamente Poniendo el token en las cabezeras se accede
router.get("/misPedidos", middlewares.checkToken, async(req,res)=>{
    
    
    var data = req.headers["user-token"];

    var token = {
        token: data,
    }

    const userToken = token.token;
    let playLoad ={};
    playLoad =jwt.decode(userToken,"frase secreta")
   
    



    console.log("Token",playLoad.usuarioId);
    
    const pedidos =  await Pedido.findAll({
        where: {
           userId: playLoad.usuarioId 
        },attributes: ['pedidoId','estado','pedidoId','tipoPago'],include: [
            {
                model:User,
                attributes: ['id','username','email','direccion','numero']
            },{
                model:Producto,
                attributes: ['id','nombre','descripcion','precio']
            }
          ]});
    
    res.json(pedidos);

});




//Esta ruta es para poner productos en el carrito
router.post("/carrito",middlewares.checkToken,agregaraCarrito);


//Esta ruta es para modificar un pedido Unicamente se puede tener acceso si se es Administrador 0= Usuario 1= ADMIN
router.put("/:pedidoId",middlewares.rol,async (req,res)=>{

        var cabecera = req.headers["user-token"];
        var usuario =  jwt.decode(cabecera,"frase secreta")

        if(!usuario || usuario.rolUsuario != ROL_ADMIN) {

            res.status(400).send(`Usuario invalido para cambiar estado de pedido.`);
            return false;
        }

        await Pedido.update(req.body,{
            where:{pedidoId: req.params.pedidoId}
        });
        res.json({succcess: "update correcto"});

        
});

//Esta ruta es para Usuarios, Esta ruta  envia lo que se puso en el carrito con una sola request 
router.post("/enviar",async (req,res,)=>{

    var detalles = [];

    //console.log(carrito);
   //var podructo = await productoPedido.create(carrito[0]);
    
   for (let index = 0; index < carrito.length; index++) {
       
        var itemCarrito = carrito[index];
        //var pedido = await Pedido.create(itemCarrito);

        for (let indice = 0; indice < itemCarrito.platos.length; indice++) {
            
            const plato = itemCarrito.platos[indice];
            
            var itemDetalle = {
                cantidad: plato.cantidad,
                platoId: plato.platoId,
                carritoPedidoId: ultimoPedido.pedidoId
            }
            var detalle = await DetallesPedido.create(itemDetalle);
            detalles.push(detalle);
        }
   }

    res.json(detalles);
    carrito =[];
       
}); 
  
//Esta ruta borra el pedido Solamente siendo administrador se puede borrar el pedido Usuario = 0  Administrador = 1

router.delete("/:pedidoId",middlewares.rol,async (req,res)=>{

    var cabecera = req.headers["user-token"];
    var usuario =  jwt.decode(cabecera,"frase secreta")

    if(!usuario || usuario.rolUsuario != ROL_ADMIN) {

        res.status(400).send(`Usuario invalido para cambiar estado de pedido.`);
        return false;
    }    
    
    await Pedido.destroy({
            where:{pedidoId: req.params.pedidoId}
        });
        res.json({succcess: "producto borrado"});
        
        
});

//Esta funcion es el carro de compras
 async function agregaraCarrito(req, res) {
  
    var cabecera = req.headers["user-token"];
   var usuario=  jwt.decode(cabecera,"frase secreta")
//Este dato es que viene de la tabla productos pedidos
    var data = req.body;
    var platos = data.platos;

    var pedido = {
        //platoId: data.platoId,
        tipoPago: data.tipoPago,
        userId:usuario.usuarioId,
        platos 
    }
    if (/*pedido.platoId == "" ||*/ !platosElegidosValido(platos) || pedido.tipoPago == "" || pedido.userId == "") {
        res.status(400).send(`Producto no agregado al carrito!
        Por favor completa todos los datos requeridos.`)
    } else {
        carrito.push(pedido);
        ultimoPedido = await Pedido.create(pedido);

        res.status(200).send("agregaste 1 producto")
    }
    console.log("este es mi carrito", carrito);
    console.log("esta es mi cabecera",usuario.usuarioId);
    return carrito

}

function platosElegidosValido(platos) {

    if(platos && platos.length > 0) {

        for (var indice = 0; indice < platos.length; indice++) {
            
            const plato = platos[indice];
            if(plato.platoId == "" || plato.cantidad == "" || plato.cantidad == 0){
                return false;
            }
        }

        return true;
    }

    return false;
}

module.exports = router;