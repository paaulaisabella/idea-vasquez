// VARIABLE PARA MOSTRAR LA LISTA DE TAREAS:
let lista = [];


// FUNCIONES

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
            let descripcion = tarea.descripcion
            const li = document.createElement("li");
            li.innerHTML = `<div class= inner-task><span class= "texto-resaltado">Nombre</span>: ${nombre} 
            <span class= "texto-resaltado">Duración:</span> ${duracion} min. 
            <span class= "texto-resaltado">Descripción:</span> ${descripcion}</div>
            <button type= "button" name= "button" id= "button" class= "borrar-item">X</button>
            `;
            mostrarTareas.appendChild(li);
        });
        }

function ordenarTareas(lista) {
    const ordenarTareas = document.querySelector(".lista__mayor");
    ordenarTareas.innerHTML = "";
    for(let i = 0; i < lista.length; i++){
    const li = document.createElement("li");
    li.innerHTML = `<div class= inner-task><span class= "texto-resaltado">Nombre:</span> ${lista[i].nombre} 
    <span class= "texto-resaltado">Duración:</span> ${lista[i].duracion} min. 
    <span class= "texto-resaltado">Descripción:</span> ${lista[i].descripcion}
    </div>`;
    ordenarTareas.appendChild(li);
};
}

// DECLARAMOS UNA CLASE CON SU MÉTODO:
class Tareas {
    constructor(nombre, duracion, descripcion){
        this.nombre = nombre;
        this.duracion = duracion;
        this.descripcion = descripcion
    }

    alertaTiempo(){
        if(this.duracion > 200) { 
            const mayor200 = document.querySelector(".contenedor__tareas");
            let p = document.createElement("p");
            p.style.color = "red"
            p.style.fontSize = "15px"
            p.textContent = "El tiempo debe ser menor a 200.";
            mayor200.appendChild(p);
        } else if (this.duracion <= 0) {
            const menor0 = document.querySelector(".contenedor__tareas");
            let p = document.createElement("p");
            p.style.color = "red"
            p.style.fontSize = "15px"
            p.textContent = "El tiempo debe ser mayor a 0";
            menor0.appendChild(p);
        } 
        /* else {
            const vacio = document.querySelector(".contenedor__tareas");
            vacio.innerHTML += " ";
            console.log(vacio);
        } */
    }

    alertaNombre(){
        if (this.nombre == "") {
            const alerta = document.querySelector(".contenedor__tareas");
            const alertaTitulo = document.createElement("p");
            alertaTitulo.style.color = "red"
            alertaTitulo.style.fontSize = "15px"
            alertaTitulo.textContent = "Tienes que ingresar un nombre para la tarea.";
            alerta.appendChild(alertaTitulo);
        }
    }
}

/* EVENTOS */
document.querySelector(".contenedor__tareas").addEventListener("submit", agregarTarea);

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
        
        tarea.alertaNombre();
        tarea.alertaTiempo();

        actualizarLS(lista);
        document.getElementById("formulario").reset();
        mostrarTareas(lista);
        ordenarTareas(lista);
    }

    /* QUIERO UN BOTÓN QUE BORRE LAS TAREAS INDIVIDUALES */

    const quitarItem = document.querySelector(".borrar-item").addEventListener("click", borrarItem);
    function borrarItem() {
        const li = document.querySelector("li");
        const ul = document.querySelector("ul");
        ul.removeChild(li);
    }

    /* ACÁ TENEMOS EL BOTÓN PARA BORRAR EL LS */
    const borrar = document.querySelector(".boton-borrar").addEventListener("click", borrarTareas);
    function borrarTareas() {
        localStorage.clear();
        lista = [];
        document.querySelector(".lista__tareas").innerHTML = lista;
        document.querySelector(".lista__mayor").innerHTML = lista;
    }


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
        actualizarLS(lista);
        ordenarTareas(lista);
