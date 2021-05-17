const formulario    =document.getElementById("mi-formulario");
const btnRegistrar  =document.getElementById("btn-registrar");
var urlUser = 'http://localhost:3000/api/users/registrer';


var usuario = {
    username : "usuario",
    password: "password",
    email: "email"

}

btnRegistrar.addEventListener("click",(ev)=>{
    ev.preventDefault();
   var  email      =document.getElementById("email").value;
   var  username   =document.getElementById("username").value;
   var  password  =document.getElementById("password").value;

    
    usuario.username = username;
    usuario.password = password;
    usuario.email    = email;


    creandoUsuario(usuario)
    console.log(usuario,"este es mi usuario");
    formulario.reset();
})





function creandoUsuario(usuario) {
    fetch(urlUser, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(usuario), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response));
}

