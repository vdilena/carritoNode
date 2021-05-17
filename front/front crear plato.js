
const btnModificarPlato               =document.getElementById("btn-modificar-plato");
const formularioCrearPlato            =document.getElementById("formulario-crear-plato");
const btnCrearPlato                   =document.getElementById("btn-crear-plato");
const btnBorrarPlato                  =document.getElementById("btn-borrar-plato");
const obtenerTodosLosPlatosDisponibles= document.getElementById("obtener-todos-los-platos");
const contenedorTodosLosPlatos        =document.getElementById("contenedor-todos-los-platos");

var todoLosPlatosArray =[];
var url = 'http://localhost:3000/api/productos';



var plato = {
    nombre : "nombre",
    precio: "precio",
    descripcion: "descripcion"

}

btnCrearPlato.addEventListener("click",(ev)=>{
    ev.preventDefault();
   var  nombre         =document.getElementById("nombre").value;
   var  precio         =document.getElementById("precio").value;
   var  descripcion    =document.getElementById("descripcion").value;

    
    plato.nombre        = nombre;
    plato.precio        = precio;
    plato.descripcion    = descripcion;


    creandoPlato(plato)
    console.log(plato,"este es mi usuario");
    formularioCrearPlato.reset();
})

obtenerTodosLosPlatosDisponibles.addEventListener("click",(ev)=>{
  contenedorTodosLosPlatos.innerHTML = "";

  setTimeout(() => {
  obtenerTodosLosPlatos();
    
  }, 100);

      var JSONString2 =JSON.stringify(todoLosPlatosArray) ;
      var pasadoAObj = JSON.parse(JSONString2);

      for (let index = 0; index < todoLosPlatosArray.length; index++) {
      console.log(pasadoAObj[index])
      contenedorTodosLosPlatos.innerHTML +=`<div><p>PLATO: </p> <p>Nombre: ${pasadoAObj[index].nombre}</p> <p>Precio: ${pasadoAObj[index].precio}</p> <p>Descripción: ${pasadoAObj[index].descripcion}</p> <p>Creado: ${pasadoAObj[index].createdAt}</p><p>ID: ${pasadoAObj[index].id}</p></div>` 
        
      }

})


btnBorrarPlato.addEventListener("click",(ev)=>{
let idPlatoABorrar=document.getElementById("borrar-plato").value

borrandoPlato(idPlatoABorrar);

  

})

 btnModificarPlato.addEventListener("click",(ev)=>{
  var idPlatoAModificar=document.getElementById("borrar-plato").value
  var urlPut = `http://localhost:3000/api/productos/${idPlatoAModificar}`;

  plato.nombre      =document.getElementById("nombre").value;
  plato.precio      =document.getElementById("precio").value;
  plato.descripcion =document.getElementById("descripcion").value;
  
  modificandoPlato(urlPut,plato);
  console.log("urlPut",urlPut);


})
 
function modificandoPlato(urlPut,plato) {
  fetch(urlPut, {
    method: 'PUT', // or 'PUT'
    body: JSON.stringify(plato), 
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => console.log('Success:', response));
}

function creandoPlato(plato) {
    fetch(url, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(plato), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

function obtenerTodosLosPlatos() {
  fetch(url)
  .then(response => response.json())
 // .then((data) => console.log(data))
  .then((data) => todoLosPlatosArray=data)

  
}

function borrandoPlato(id) {
  fetch(url+"/"+id, {
      method: 'DELETE', 
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => console.log('Success:', response));
}