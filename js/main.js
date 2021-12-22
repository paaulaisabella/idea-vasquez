$( document ).ready(function() {
    console.log('El DOM esta listo');
});

// VARIABLE PARA MOSTRAR LA LISTA DE TAREAS:
let lista = [];

// FUNCIONES ------------------------------------------------


// LS
function actualizarLS(lista) {
    const tareasJSON = JSON.stringify(lista);
    localStorage.setItem("tareas", tareasJSON);
}

const tareasLS = localStorage.getItem("tareas");

if (tareasLS === null){
lista = [];
} else {
lista = JSON.parse(tareasLS);
mostrarTareas(lista);
}

//ANIMACIÓN PARA QUE EL TÍTULO APAREZCA Y DESAPAREZCA AL CARGAR LA PÁGINA 
$("h1").fadeOut(2000, function(){
    $("h1").fadeIn(2000);
}); 

// TAREAS

function mostrarTareas(lista) { 
    const mostrarTareas = document.querySelector(".lista__tareas");
    mostrarTareas.innerHTML = "";
    
    lista.forEach(tarea => { 
        let nombre = tarea.nombre;
        let duracion = tarea.duracion;
        let descripcion = tarea.descripcion;

        /* const li = document.createElement("li");
        li.className = "list-item"
        li.innerHTML = `<div class= "inner-task"><span class= "texto-resaltado">Nombre: </span> ${nombre}
        <span class= "texto-resaltado">Duración: </span> ${duracion} min. 
        <span class= "texto-resaltado">Descripción: </span> ${descripcion} </div>
        <button type= "button" name= "button" id= "button" class= "borrar-item">X</button>
        `;
        mostrarTareas.appendChild(li); */

        /* CON JQUERY */
        $(".lista__tareas").append(`<li class = "list-item"><div class= "inner-task"><span class= "texto-resaltado">Nombre: </span> ${nombre}
        <span class= "texto-resaltado">Duración: </span> ${duracion} min. 
        <span class= "texto-resaltado">Descripción: </span> ${descripcion} </div>
        <button type= "button" name= "button" id= "button" class= "borrar-item">X</button></li>`)

        });
}

$("#comenzar").click(function (e) { //FUNCIÓN PARA COMENZAR EL TEMPORIZADOR
    e.preventDefault();
    for (let i = 0; i < lista.length; i++){
        let duracion = lista[i].duracion;
        let tiempo = duracion * 60;
    
        let recargarIntervalo = setInterval(actualizarConteo, 1000);
        
        function actualizarConteo(){
            const minutos = Math.floor(tiempo / 60);
            let segundos = tiempo % 60;
    
            segundos = segundos < 10 ? '0' + segundos : segundos;
    
            let seccion = document.querySelector(".seccion");
            seccion.innerHTML = " "; //AGREGAMOS ESTO PARA QUE SE VAYAN BORRANDO LOS NÚMEROS Y NO SE ACUMULEN AL LADO DEL OTRO
            let parrafo = document.createElement("p");
            parrafo.textContent = ` ${minutos}:${segundos} `
            seccion.appendChild(parrafo);
            
            tiempo--;
            if (tiempo < 0) { // ESTO PARA QUE NO SE VAYA A LOS NÚMEROS NEGATIVOS
                clearInterval(recargarIntervalo);
            }
        }
        actualizarConteo();
        $(".contenedor__cuadro-tareas").append(" ");
        $(".contenedor__cuadro-tareas").append(`<p class = "llevando-a-cabo">${lista[i].nombre} <br>
        "${lista[i].descripcion}"</p>`)
    }
});

// DECLARAMOS UNA CLASE CON SU MÉTODO PARA CADA TAREA
class Tareas {
    constructor(nombre, duracion, descripcion){
        this.nombre = nombre;
        this.duracion = duracion;
        this.descripcion = descripcion;
    }

    // AGREGAMOS UNA ALERTA POR SI INGRESAN UN NÚMERO INVÁLIDO
    alertaTiempo(){
        if(this.duracion > 200) { 
            /* const mayor200 = document.querySelector(".contenedor__tareas");
            let p = document.createElement("p");
            p.style.color = "red"
            p.style.fontSize = "15px"
            p.textContent = "El tiempo debe ser menor a 200.";
            mayor200.appendChild(p); */

            /* CON JQUERY */
            $(".contenedor__tareas").append(`<p class= "alerta-usuario">El tiempo debe ser menor a 200min</p>`);
        } else if (this.duracion <= 0) {

            $(".contenedor__tareas").append(`<p class= "alerta-usuario">El tiempo debe ser mayor a 0min</p>`);
        }
    }

}

/* EVENTOS */

    $("#formulario").submit((e) => { // HACEMOS CLICK PARA ENVIAR EL FORMULARIO, ESTAS TAREAS SE VAN AGREGANDO AL ARRAY
        e.preventDefault();
        
        let nombreTarea = document.getElementById("nombre-tarea").value;
        let tiempoTarea = Number(document.getElementById("tiempo-tarea").value);
        let descripTarea = document.getElementById("descripcion-tarea").value;

        const tarea = new Tareas (nombreTarea, tiempoTarea, descripTarea);

        
        if (nombreTarea !== "" && tiempoTarea !== 0 && tiempoTarea <= 200 && tiempoTarea > 0) {
            const vacio = document.querySelector(".contenedor__tareas");
            vacio.innerHTML += "";
            lista.push(tarea);
        } 
        

        tarea.alertaTiempo();
        actualizarLS(lista);
        document.getElementById("formulario").reset(); // ESTO PARA QUE EL FORMULARIO SE LIMPIE CADA VEZ QUE AGREGAMOS UNA TAREA
        mostrarTareas(lista);
    })

    /* BOTONES--------------------------------------- */
    
    // AGREGAMOS UN BOTÓN A CADA TAREA PARA ELIMIARLA INDIVIDUALMENTE (ESTO TODAVÍA NO LA BORRA DEL LS)
    const quitarItem = document.querySelectorAll('.borrar-item');
    for (let i = 0; i < quitarItem.length; i++){
        quitarItemEvento = quitarItem[i].addEventListener("click", (e) => {
            const boton = e.target
            boton.closest('.list-item').remove();
        });
    }

    // AGREGAMOS UN BOTÓN PARA BORRAR TODO EL LOCALSTORAGE

    /* const borrar = document.querySelector(".boton-borrar").addEventListener("click", borrarTareas);
    function borrarTareas() {
        localStorage.clear();
        lista = [];
        document.querySelector(".lista__tareas").innerHTML = lista;
    } */

    /* CON JQUERY */
    $(".boton-borrar").click(() => {
        localStorage.clear();
        lista = [];
        document.querySelector(".lista__tareas").innerHTML = lista;
    })

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=buenos%20aires&appid=348cf72de878e18e0d71982cafeef024&units=metric&lang_es",
        success: function (respuesta) {
            console.log(`${respuesta.weather}`);
            mostrarDatos(respuesta);
        }
    });

    let mostrarDatos = (clima) => {
        infoClima = $("main");
        infoClima.append(`<div class="tercer-contenedor clima">
        <p>El clima actual es: ${clima.weather.main}</p></div>`)
        console.log(`${clima.weather.main}`)

    }