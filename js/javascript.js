
// VARIABLE PARA MOSTRAR LA LISTA DE TAREAS:
let lista = [];

// VARIABLE DE CANTIDAD DE TAREAS:
let cantTareas;

// INICIA BUCLE PARA VER CANT. DE TAREAS
do {
    cantTareas = Number(prompt("Ingrese la cantidad de tareas a realizar."));
if (cantTareas <= 0) {
    alert("Has ingresado un número inválido.");
} else if (cantTareas > 99) {
    alert("No puedes ingresar más de 99 tareas.")
}
} while (cantTareas <= 0 || cantTareas > 99);


// DECLARAMOS UNA CLASE CON SU MÉTODO:
class Tareas {
    constructor(nombre, duracion, categoria){
        this.nombre = nombre;
        this.duracion = duracion;
        this.categoria = categoria
    }

    alertaUsuario(){
        if(this.duracion > 200) { 
            alert("Ingrese un tiempo válido.");
        } else if (this.duracion < 0) {
            alert("Usted ingresó un tiempo inválido, intente de nuevo.");
        } else {
            alert(`La tarea se llama ${this.nombre} y dura ${this.duracion}min. Su categoría es: ${this.categoria}`);
        } 
    }

}

// INICIAMOS UN FOR PARA PEDIR DATOS DE LAS TAREAS A REALIZAR: 
for (let i = 0; i < cantTareas; i++) {
    let nombreTarea = prompt("Ingrese el nombre de la tarea.");
    let tiempoTarea = Number(prompt("Ingrese el tiempo de duración (en minutos)."));
    let categTarea = prompt("Ahora, indique la categoría de la tarea (escuela, trabajo, hogar...).");

    const tarea = new Tareas (nombreTarea, tiempoTarea, categTarea);

    tarea.alertaUsuario();
    lista.push(tarea);

    lista.sort ((a, b) => {
        if (a.duracion < b.duracion) {
            return 1;
        }
        if (a.duracion > b.duracion) {
            return -1;
        }
        return 0;
    })
}

console.log(lista);

// Para el desafío complementario incluí una función que organiza las tareas por duración de mayor a menor 


