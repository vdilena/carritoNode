module.exports =(sequelize,type) =>{
    const Platos = sequelize.define("platos",{
        //ID auto encremental y forgeinKey
        id:{
            type: type.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        //Simplemente genero el nombre // descripcion y Precio del plato en Cuestion
        nombre: type.STRING,
        descripcion: type.STRING,
        precio: type.INTEGER,

    })


    return Platos;
}