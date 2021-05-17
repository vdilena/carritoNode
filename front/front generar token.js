
const urlToken     ="http://localhost:3000/api/users/login";
const btnToken=document.getElementById("generar-token");
var miToken ;

var usuario   = {
    username : "usuario",
    password: "password",
    email: "email"

}


btnToken.addEventListener("click",(ev)=>{
ev.preventDefault();
    var  email     =document.getElementById("email-l").value;
   var  username   =document.getElementById("username-l").value;
   var  password  =document.getElementById("password-l").value;
   
   usuario.username = username;
    usuario.password = password;
    usuario.email    = email;
    generarToken(usuario)
    alert("Si su usuario es correcto, abra la consola y tendra su clave Token");
});


function generarToken(usuario) {
    fetch(urlToken, {
        method: 'POST', // or 'PUT'
        body: JSON.stringify(usuario), 
        headers:{
          'Content-Type': 'application/json'
        }
      }).then(res => res.json())
      .catch(error => console.error('Error:', error))
      .then(response => console.log('Success:', response))
      
      

}