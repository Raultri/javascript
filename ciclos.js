//Crear un algoritmo utilizando un ciclo

let salida = prompt("Ingrese el nombre de un deporte");
while(salida != "Cerrar") {
    alert ("El deporte que has elegido en primer lugar es " +salida);
    salida = prompt("Ingrese el nombre de otro deporte");
    alert ("El deporte que has elegido en segundo lugar es " +salida);
    salida = prompt("Por última vez, ingrese el nombre de otro deporte");
    alert ("El deporte que has elegido por última vez es " +salida);
    salida = prompt("Escriba Cerrar para salir del ciclo");
    alert ("Ya ingreso la palabra mágica " +salida+ ' Hasta la próxima');
}