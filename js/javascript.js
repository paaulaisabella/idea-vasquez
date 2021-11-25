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
        const li = document.createElement("li");
        li.textContent = `Nombre: ${tarea.nombre}. Duración: ${tarea.duracion} min. Descripción: ${tarea.descripcion}.`;
        mostrarTareas.appendChild(li);
    });
    }

function ordenarTareas(lista) {
    const ordenarTareas = document.querySelector(".lista__mayor");
    ordenarTareas.innerHTML = "";
    for(let i = 0; i < lista.length; i++){
    const li = document.createElement("li");
    li.textContent = `Nombre: ${lista[i].nombre}. Duración: ${lista[i].duracion} min. Descripción: ${lista[i].descripcion}.`;
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

    /* alertaUsuario(){
        if(this.duracion > 200) { 
            const tiempoValido = document.getElementById("tiempo");
            const p = createElement("p");
            p.textContent = "El tiempo debe ser menor a 200.";
            tiempoValido.appendChild(p);
        } else if (this.duracion <= 0) {
            p.textContent = "El tiempo debe ser mayor a 0";
            tiempoValido.appendChild(p);
        }
    } */
}

/* EVENTOS */
document.querySelector(".contenedor__tareas").addEventListener("submit", agregarTarea);

    function agregarTarea(e){
        e.preventDefault();
        
        let nombreTarea = document.getElementById("nombre-tarea").value;
        let tiempoTarea = Number(document.getElementById("tiempo-tarea").value);
        let descripTarea = document.getElementById("descripcion-tarea").value;
        
        const tarea = new Tareas (nombreTarea, tiempoTarea, descripTarea);
        // alertaUsuario();
        
        if (nombreTarea !== "" && tiempoTarea !== 0) {
        lista.push(tarea);
        } else if (nombreTarea == "") {
            const alerta = document.querySelector(".contenedor__tareas");
            alerta.innerHTML += "";
            const alertaTitulo = document.createElement("p");
            alertaTitulo.style.color = "red"
            alertaTitulo.style.fontSize = "15px"
            alertaTitulo.textContent = "Tienes que ingresar un nombre para la tarea.";
            alerta.appendChild(alertaTitulo);
        } else if (tiempoTarea == 0) {
            const alerta = document.querySelector(".contenedor__tareas");
            alerta.innerHTML += "";
            const alertaTiempo = document.createElement("p");
            alertaTiempo.style.color = "red"
            alertaTiempo.style.fontSize = "15px"
            alertaTiempo.textContent = "Tienes que ingresar el tiempo de la tarea.";
            alerta.appendChild(alertaTiempo);
        }
        
        actualizarLS(lista);
        document.getElementById("formulario").reset();
        mostrarTareas(lista);
    }

    /* ACÁ TENEMOS EL BOTÓN PARA BORRAR EL LS */
    const borrar = document.querySelector(".boton-borrar").addEventListener("click", borrarTareas);
    function borrarTareas() {
        localStorage.clear();
        lista = [];
        document.querySelector(".lista__tareas").innerHTML = lista;
        document.querySelector(".lista__mayor").innerHTML = lista;
    }

    /* actualizarLS(lista); */
    /* const displayNombre = document.querySelector(".contenedor__cuadro-tareas");
    const parrafo = document.createElement("p");
    parrafo.textContent = lista[0].nombre;
    displayNombre.appendChild(parrafo); */


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




