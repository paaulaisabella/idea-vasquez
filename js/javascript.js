let tareas = Number(prompt("Ingresa la cantidad de tareas a realizar"));


function pedirInfo() {
    let nombreTarea = prompt("Ingresa el nombre de la tarea");
    let tiempoTarea = Number(prompt("Ingresa el tiempo de duración"));

    alert(`El nombre de la tarea es ${nombreTarea} y su duración es ${tiempoTarea}`);
}


for (i = 0; i < tareas; i++) {
    pedirInfo();
}