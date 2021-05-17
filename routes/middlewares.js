
const jwt      = require("jwt-simple");
const moment   = require("moment");
// Esta funcion checkea el token
const checkToken = (req,res,next)=>{
    //si no le pongo el token devuelve la reseña
    if(!req.headers["user-token"])
    {
        return res.json({error:"Necesitas incluir el user-token en la cabecera"})
    }
    //obtengo el token
const userToken = req.headers["user-token"];
let playLoad ={};
try{
    //Hago uso de jwt y desencripto el token con la frase secreta
    playLoad =jwt.decode(userToken,"frase secreta")
   
    
//En caso de que este mal no va poder desencriptar por en se va porner la reseña token incorrecto
}catch(err){
    return res.json({error :"El token es incorrecto"});
}

//Doy el tiempo al token
if(playLoad.expiredAt<moment().unix()){
    return res.json({error: "El token a expirado"})
}
//Aca simplemente le asigno el token al Usuario que viene como Parametro 
req.usuarioId =playLoad.UsuarioId;

    next();

}





// Este middleware checkea si eres administrador, 0 significa que no, 1 que si;
const rol = (req,res ,next) =>{
    var cabecera = req.headers["user-token"];
    var usuario=  jwt.decode(cabecera,"frase secreta");
    console.log("esta es mi cabecera",usuario.rolUsuario);

    if(usuario.rolUsuario !=1){
        return res.json({error:"necesitas ser administrador"})
    }

    
   

    next();



}

//Este middleWare chekea si eres un Usuario // esta especialemente creado para el Chekequeo de la ruta mis pedidos
/* const rolMisPedidos = (req,res ,next) =>{

    if(req.body.rol !=0){
        return res.json({error:"Solamente los usuarios pueden hacer uso de esta funcion, debe enviar un rol valido y su token  en los headers"})
    }

    
   

    next();



}
 */




module.exports ={
    checkToken : checkToken,
    rol:rol,
  /*   rolMisPedidos:rolMisPedidos, */
}