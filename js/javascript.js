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
ordenarTareas(lista);
}

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

function ordenarTareas(lista) {
    const ordenarTareas = document.querySelector(".lista__mayor");
    ordenarTareas.innerHTML = "";

    for(let i = 0; i < lista.length; i++){

    /* const li = document.createElement("li");
    li.innerHTML = `<div class= inner-task><span class= "texto-resaltado">Nombre:</span> ${lista[i].nombre} 
    <span class= "texto-resaltado">Duración:</span> ${lista[i].duracion} min. 
    <span class= "texto-resaltado">Descripción:</span> ${lista[i].descripcion}
    </div>`;
    ordenarTareas.appendChild(li); */

    /* CON JQUERY */
    $(".lista__mayor").append(`<li class = "list-item"><div class= inner-task><span class= "texto-resaltado">Nombre:</span> ${lista[i].nombre} 
    <span class= "texto-resaltado">Duración:</span> ${lista[i].duracion} min. 
    <span class= "texto-resaltado">Descripción:</span> ${lista[i].descripcion}
    </div></li>`);
};
}

// DECLARAMOS UNA CLASE CON SU MÉTODO:
class Tareas {
    constructor(nombre, duracion, descripcion){
        this.nombre = nombre;
        this.duracion = duracion;
        this.descripcion = descripcion;
        
    }

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
            /* const menor0 = document.querySelector(".contenedor__tareas");
            let p = document.createElement("p");
            p.style.color = "red"
            p.style.fontSize = "15px"
            p.textContent = "El tiempo debe ser mayor a 0";
            menor0.appendChild(p); */

            /* CON JQUERY */
            $(".contenedor__tareas").append(`<p class= "alerta-usuario">El tiempo debe ser mayor a 0min</p>`);
        }
    }

}

/* EVENTOS */
/* document.querySelector(".contenedor__tareas").addEventListener("submit", agregarTarea);

    function agregarTarea(e){
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
        document.getElementById("formulario").reset();
        mostrarTareas(lista);
        ordenarTareas(lista);
    } */

    $("#formulario").submit((e) => {
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
        document.getElementById("formulario").reset();
        mostrarTareas(lista);
        ordenarTareas(lista);
    })

    /* QUIERO UN BOTÓN QUE BORRE LAS TAREAS INDIVIDUALES */
    
    const quitarItem = document.querySelectorAll('.borrar-item');
    for (let i = 0; i < quitarItem.length; i++){
        quitarItemEvento = quitarItem[i].addEventListener("click", (e) => {
            const boton = e.target
            boton.closest('.list-item').remove();
        });
    }


    /* BOTÓN PARA BORRAR EL LS */

    /* const borrar = document.querySelector(".boton-borrar").addEventListener("click", borrarTareas);
    function borrarTareas() {
        localStorage.clear();
        lista = [];
        document.querySelector(".lista__tareas").innerHTML = lista;
        document.querySelector(".lista__mayor").innerHTML = lista;
    } */

    /* CON JQUERY */
    $(".boton-borrar").click(() => {
        localStorage.clear();
        lista = [];
        document.querySelector(".lista__tareas").innerHTML = lista;
        document.querySelector(".lista__mayor").innerHTML = lista;
    })


    /* PARA ORDENAR LAS TAREAS DE MAYOR A MENOR: */
        lista.sort ((a, b) => {
            if (a.duracion < b.duracion) {
                return 1;
            }
            if (a.duracion > b.duracion) {
                return -1;
            }
            return 0;
        })
        ordenarTareas(lista);
