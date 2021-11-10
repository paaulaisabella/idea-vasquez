let cantTareas;
do {
    cantTareas = Number(prompt("Ingrese la cantidad de tareas a realizar."));
if (cantTareas <= 0) {
    alert("Has ingresado un número inválido.");
} else if (cantTareas > 99) {
    alert("No puedes ingresar más de 99 tareas.")
}
} while (cantTareas <= 0 || cantTareas > 99);

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
        } else if (this.duracion == NaN) {
                alert("Por favor ingrese un número.");
        } else {
            alert(`La tarea se llama ${this.nombre} y dura ${this.duracion}min. Su categoría es: ${this.categoria}`);
        } 
    }
}

for (let i = 0; i < cantTareas; i++) {
    let nombreTarea = prompt("Ingrese el nombre de la tarea.");
    let tiempoTarea = Number(prompt("Ingrese el tiempo de duración (en minutos)."));
    let categTarea = prompt("Ahora, indique la categoría de la tarea (escuela, trabajo, hogar...).");
    let tarea = new Tareas (nombreTarea, tiempoTarea, categTarea);
    tarea.alertaUsuario();
}
