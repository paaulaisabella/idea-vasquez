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
    $(".contenedor__tareas").fadeOut(); //QUITAMOS EL FORMULARIO PARA QUE NO SE AGREGUEN MÁS TAREAS MIENTRAS CORRE EL TIMER
    $(".primer-contenedor").css("justify-content", "center");
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
            if (tiempo < 0) { // ESTO PARA QUE NO SE VAYA A NÚMEROS NEGATIVOS
                clearInterval(recargarIntervalo);
            }
            if (tiempo == 0){
                $(".contenedor__tareas").fadeIn("slow");
            }
        }
        
        if(i >= lista.length) continue
        actualizarConteo(recargarIntervalo);
        let contenedor = document.querySelector(".contenedor__cuadro-tareas");
        contenedor.innerHTML += " ";
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

        //AGREGAMOS UNA CONDICIÓN PARA EVITAR QUE SE AGREGUEN TAREAS VACÍAS, SIN TIEMPO O CON TIEMPO MAYOR A 200
        if (nombreTarea !== "" && tiempoTarea !== 0 && tiempoTarea <= 200 && tiempoTarea > 0) {
            const vacio = document.querySelector(".contenedor__tareas");
            vacio.innerHTML += "";
            lista.push(tarea);
        } 
        
        //EJECUTAMOS LAS FUNCIONES CORRESPONDIENTES
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

// AJAX

    $("#fecha").click(function (e) { //ESTE BOTÓN ES PARA PODER ACCEDER A LOS DATOS DE LA API DE FERIADOS
        e.preventDefault();
        for(let i = 0; i < 16; i++){ //UTILIZAMOS UN FOR PARA QUE RECORRA TODOS LOS DATOS DEL ARRAY
            let mostrarDatos = (fecha) => {
                $(".tercer-contenedor").append(`<p class = "parrafo-feriados">El ${fecha[i].date} es ${fecha[i].localName}</p>`)
                $(".parrafo-feriados").css({"margin": "0% 5% 3%",
                                    "background-color": "rgba(178, 178, 179, 0.502)",
                                    "border-radius": "3px",
                                    "padding": "3px"});
            }
    
            let url = "https://date.nager.at/api/v3/publicholidays/2022/AR"
            const getData = () => {
                $.ajax({
                    method: "GET",
                    url: url,
                    success: (response) => {
                        mostrarDatos(response);
                    }
                });
            }
            getData();
        }
    });