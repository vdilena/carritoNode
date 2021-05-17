module.exports =(sequelize,type) =>{
    const Users = sequelize.define("users",{
        id:{
            //ID Auto Increment y ForgeinKey
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        username: type.STRING,
        email: type.STRING,
        password: type.STRING,
        direccion: type.STRING,
        numero:type.STRING,
        //Rol de administrador que por defecto es un usuario ordinario si se quiere por defecto podria ser administrador
        //De esa forma haria un prueba mas rapida de los ENDPOINTS
        rol:{
            type:type.INTEGER,
            defaultValue:0
        }

    })


    return Users;
}
