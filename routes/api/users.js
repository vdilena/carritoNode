const router                    = require("express").Router();
const bcrypt                    = require("bcryptjs");
const {User}                    = require("../../db");
const {check, validationResult} =require ("express-validator");
const moment                    = require("moment");
const jwt                       = require("jwt-simple");
const { rol } = require("../middlewares");



router.post("/registrer",async (req,res)=>{

    // req.body.password =  bcrypt.hashSync(req.body.password,10);
     const user =  await User.create(req.body);
     res.json(user);
 
 })
 

 router.post("/login",async (req,res)=>{

     const user =  await User.findOne({where:{
         email:req.body.email,
         rol:req.body.rol }});
     
     const password =  await User.findOne({where:{password:req.body.password}});
     const username =  await User.findOne({where:{username:req.body.username}});

     if (user) {
         
    }else{
       res.json({error: " el rol no concuerda con el de la base de datos"});

        
    }
     if (username) {
         
    }else{
    res.json({error: " La contraseña o el usuario son incorrectos"});
        
    }
    if (password) {
         res.json(
             {
                Token:createToken(user),
                Usuario:"ha ingresado el Usuario Correctamente",
                
                
                })
    }else{
    res.json({error: " La contraseña o el usuario son incorrectos"});
        
    }


    
 
 })

const createToken = (user,rol) =>{
    const playLoad ={
        usuarioId:user.id,
        rolUsuario:user.rol,
        createAt:moment().unix(),
        expiredAt:moment().add(60,"minutes").unix()
    }
    return jwt.encode(playLoad,"frase secreta");

}


module.exports = router;