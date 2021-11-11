
// VARIABLE PARA MOSTRAR LA LISTA DE TAREAS:
let lista = [];

// VARIABLE DE CANTIDAD DE TAREAS:
let cantTareas;


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

let numero = Number(prompt(`- Presione 1 para agregar tareas.
- Presione 2 para ver las tareas ordenadas de mayor a menor.
- Presione cualquier otra tecla para terminar.`));

while (numero == 1 || numero == 2 || numero == 3) {
switch (numero) {
    case 1:
    // INICIA BUCLE PARA VER CANT. DE TAREAS
    do {
        cantTareas = Number(prompt("Ingrese la cantidad de tareas a realizar."));
    if (cantTareas <= 0) {
        alert("Has ingresado un número inválido.");
    } else if (cantTareas > 99) {
        alert("No puedes ingresar más de 99 tareas.")
    }
    } while (cantTareas <= 0 || cantTareas > 99);

        for (let i = 0; i < cantTareas; i++) {
            let nombreTarea = prompt("Ingrese el nombre de la tarea.");
            let tiempoTarea = Number(prompt("Ingrese el tiempo de duración (en minutos)."));
            let categTarea = prompt("Ahora, indique la categoría de la tarea (escuela, trabajo, hogar...).");
        
            const tarea = new Tareas (nombreTarea, tiempoTarea, categTarea);
        
            tarea.alertaUsuario();
            lista.push(tarea);
        }
        console.log(lista);
        break;
    case 2:
        lista.sort ((a, b) => {
            if (a.duracion < b.duracion) {
                return 1;
            }
            if (a.duracion > b.duracion) {
                return -1;
            }
            return 0;
        })
        alert("Presiona cualquier tecla y dirígete a la consola (Click derecho -> Inspeccionar -> Consola)")
        console.log(lista);
        break;

    case 3:
        alert(`Tienes ${lista.length} tarea(s) por realizar`);
        break;
    default:
        break;
}
    numero = Number(prompt(`- Presione 1 para agregar tareas.
- Presione 2 para ver las tareas ordenadas de mayor a menor.
- Presione cualquier otra tecla para terminar.`));
}
