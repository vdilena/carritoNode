const express = require("express");
const cors    = require("cors");
const app     = express();
require("./db");
const apiRoutes = require("./routes/api");

//Uso la funcion en cors en el modulo de cors
app.use(cors());
app.use(express.json());
//Esta propiedad de express se usa usualmente para los Metodos POST PUT DELETE
app.use(express.urlencoded({extended:true}))



app.use("/api",apiRoutes)


//Hago que el servidor escuche en el puerto 3000
app.listen(3000,()=>{
    console.log("Servidor online");
});
