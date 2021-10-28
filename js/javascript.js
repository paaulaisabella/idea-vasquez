/* Una compañía dedicada al alquiler de automoviles cobra un monto fijo de $300000 para los primeros 300 km de recorrido. 
Para más de 300 km y hasta 1000 km, cobra un monto adicional de $15.000 por cada kilómetro en exceso sobre 300. 
Para más de 1000 km cobra un monto adicional de $ 10.000 por cada kilómetro en exceso sobre 1000. 
Los precios ya incluyen el 20% del impuesto general a las ventas, IVA. Diseñe un algoritmo que determine el monto a pagar por el alquiler de un vehículo y el monto incluído del impuesto. */

let km = prompt("Por favor, ingresa la cantidad de kilómetros recorridos");
let montoFijo = 300000;
let montoAdicional1 = 15000;
let montoAdicional2 = 10000;
let iva = 0.2;

const recorrido = Number(km)

let valor1 = (recorrido - 300) * montoAdicional1; 
let valor2 = (recorrido - 1000) * montoAdicional2; 

let subTotal1 = valor1 + montoFijo;
let subTotal2 = valor2 + montoFijo;

if (km <= 300) {
    alert("El costo total es $" + montoFijo);
} else if (km > 300 && km <= 1000) {
    alert("El costo total es igual a $" + subTotal1 + ". Y el total con el IVA es igual a $" + ((subTotal1 * iva) + subTotal1));
} else {
    alert("El costo total es igual a $" + subTotal2 + ". Y el total con el IVA es igual a $" + ((subTotal2 * iva) + subTotal2));
}
