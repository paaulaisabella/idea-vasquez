$( document ).ready(function() {
    console.log('El DOM esta listo');
});

// VARIABLE PARA MOSTRAR LA LISTA DE TAREAS:
let lista = []; //COMENZAMOS EL ARRAY PARA PODER UTILIZARLO MÁS ADELANTE

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

//CREAMOS UNA CLASE CON SU CONSTRUCTOR PARA LOS OBJETOS
class Tareas {
    constructor(nombre, descripcion){
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.id = Date.now();
    }

    //GENERAMOS UN MÉTODO PARA CUANDO EL CAMPO DEL NOMBRE ESTÉ VACÍO, ASÍ LE INDICAMOS AL USUARIO QUE LO LLENE
    mostrarError(){
        let error = document.createElement("p");
        error.textContent = "Debes escribir el nombre de la tarea.";
        error.className = "texto-resaltado";
        error.style.marginTop = "1rem";
        let lista = document.querySelector(".contenedor__tareas");
        lista.appendChild(error);

        //ESTO HACE QUE LA ALERTA DURE 3 SEGUNDOS Y NO SE QUEDE ESCRITA EN EL CUADRO
        setTimeout(() => {
            error.remove();
        }, 3000
        );
    }
}
//ANIMACIÓN PARA QUE EL TÍTULO APAREZCA Y DESAPAREZCA AL CARGAR LA PÁGINA 
$("h1").fadeOut(2000, function(){
    $("h1").fadeIn(2000);
}); 

function mostrarTareas() {
    //LIMPIAMOS EL HTML CUANDO SE AGREGAN MÁS TAREAS
    const mostrarTareas = document.querySelector(".lista__tareas");
    mostrarTareas.innerHTML = "";
    
    lista.forEach(tarea => { 
        let nombre = tarea.nombre;
        let descripcion = tarea.descripcion;
        let id = tarea.id;

        $(".lista__tareas").append(`<li class = "list-item"><div class = "inner-task">
        <p class = "texto" ><span class = "texto-resaltado">Nombre:</span> ${nombre}<br>
        <span class = "texto-resaltado"> Descripción: </span> ${descripcion}</div></p>
        <button type= "button" name= "button" id= "${id}" class= "borrar-item">X</button></li>`)

        });
}

$("#formulario").submit((e) => { //HACEMOS CLICK PARA ENVIAR EL FORMULARIO, ESTAS TAREAS SE VAN AGREGANDO AL ARRAY
        e.preventDefault();
        
        let nombreTarea = document.getElementById("nombre-tarea").value;
        let descripTarea = document.getElementById("descripcion-tarea").value;

        const tarea = new Tareas (nombreTarea, descripTarea);

        //AGREGAMOS UNA CONDICIÓN PARA EVITAR QUE SE AGREGUEN TAREAS VACÍAS
        if (nombreTarea) {
            const vacio = document.querySelector(".contenedor__tareas");
            vacio.innerHTML += "";
            lista.push(tarea);
        } else {
            tarea.mostrarError(); //CORREMOS EL MÉTODO QUE AVISA SI EL INPUT DEL NOMBRE ESTÁ VACÍO
        }
        
        //EJECUTAMOS LAS FUNCIONES CORRESPONDIENTES
        actualizarLS(lista);
        document.getElementById("formulario").reset(); // ESTO PARA QUE EL FORMULARIO SE LIMPIE CADA VEZ QUE AGREGAMOS UNA TAREA
        mostrarTareas(lista);
    })


    //EVENTO PARA BORRAR LAS TAREAS DE MANERA INDIVIDUAL
$(".contenedor__cuadro-porHacer").click((e) => {
    if (e.target.tagName == 'BUTTON'){ //SI EL ELEMENTO SELECCIONADO DENTRO DEL CONTENEDOR ES UN BOTÓN, SE PROCEDE A BORRAR LA TAREA
        const deleteId = parseInt(e.target.getAttribute('id'));
        lista = lista.filter(tarea => tarea.id !== deleteId); //DEVUELVE EL ARRAY SIN LA TAREA SELECCIONADA
        
        //CORREMOS LAS FUNCIONES CORRESPONDIENTES
        actualizarLS(lista);
        mostrarTareas(lista);
    }
    })

    //AGREGAMOS UN BOTÓN PARA BORRAR TODA LA LISTA 
$(".boton-borrar").click(() => {
    localStorage.clear(); //ACÁ NOS ASEGURAMOS DE BORRARLO DEL LS 
    lista = [];
    document.querySelector(".lista__tareas").innerHTML = lista;
})

// AJAX

$("#fecha").click(function (e) { //ESTE BOTÓN ES PARA PODER ACCEDER A LOS DATOS DE LA API DE FERIADOS
    e.preventDefault();
    $("#fecha").hide();
    for(let i = 0; i < 16; i++){ //UTILIZAMOS UN FOR PARA QUE RECORRA TODOS LOS DATOS DEL ARRAY
        let mostrarDatos = (fecha) => {
            $(".segundo-contenedor").append(`<p class = "parrafo-feriados">El ${fecha[i].date} es ${fecha[i].localName}</p>`)
            $(".parrafo-feriados").css({"margin": "0% 5% 3%",
                                "background-color": "#189ad29d",
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