alert("¡Regístrate para ingresar!");
const usuario = prompt("Ingresa tu nombre de usuario (ten en cuenta que el programa es sensible a mayúsculas y minúsculas)");
const contraseña = prompt("Ingresa tu contraseña");
alert("¡Usuario registrado!");

do {
    var ingresoUsuario = prompt("Para ingresar, escribe tu nombre de usuario");
    
    if (ingresoUsuario == usuario) {
        var ingresoContraseña = prompt("Ahora, escribe tu contraseña"); 
        if (ingresoContraseña == contraseña){
            console.log(`¡Hola, ${usuario}!`);
        } else {
            alert("Contraseña incorrecta, intenta de nuevo");
        }
    } else {
        alert("Usuario inválido, intenta de nuevo");
    } 

} while ((ingresoUsuario != usuario) || (ingresoContraseña != contraseña)); 
