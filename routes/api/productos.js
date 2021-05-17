const router = require("express").Router();
const middlewares = require("../middlewares");
const {Producto} = require("../../db")

const jwt      = require("jwt-simple");
const ROL_ADMIN = 1;

//Tanto los administradores como usuarios pueden ver todos los productos

router.get("/", async(req,res)=>{
    const productos =  await Producto.findAll();
    res.json(productos);

});

// Solamente un Usuario con rol de Administrador puede crear un pedido Administrador = 1 Usuario =0
router.post("/",middlewares.rol,async (req,res)=>{

    var cabecera = req.headers["user-token"];
    var usuario =  jwt.decode(cabecera,"frase secreta");

    if(!esUsuarioValidoParaGestionarProducto(usuario)) {

        res.status(400).send(`Usuario invalido para agregar producto.`);
        return false;
    }

    const producto = await Producto.create(req.body);
    res.json(producto);

});
// Solamente un Usuario con rol de Administrador puede modificar un pedido Administrador = 1 Usuario =0
router.put("/:productoId",middlewares.rol,async (req,res)=>{

    var cabecera = req.headers["user-token"];
    var usuario =  jwt.decode(cabecera,"frase secreta");

    if(!esUsuarioValidoParaGestionarProducto(usuario)) {

        res.status(400).send(`Usuario invalido para actualizar producto.`);
        return false;
    }

    await Producto.update(req.body,{
        where:{id: req.params.productoId}
    });
    res.json({succcess: "update correcto"});
    
    
});

//Solamente los administradores pueden borrar Productos Administrador = 1 Usuario =0
router.delete("/:productoId",middlewares.rol,async (req,res)=>{


    var cabecera = req.headers["user-token"];
    var usuario =  jwt.decode(cabecera,"frase secreta");

    if(!esUsuarioValidoParaGestionarProducto(usuario)) {

        res.status(400).send(`Usuario invalido para eliminar producto.`);
        return false;
    }

      await Producto.destroy({
          where:{id: req.params.productoId}
      });
      res.json({succcess: "producto borrado"});
      
      
});
   
function esUsuarioValidoParaGestionarProducto(usuario) {

    if(!usuario || usuario.rolUsuario != ROL_ADMIN) {
        return false;
    }

    return true;
}
    

module.exports = router;