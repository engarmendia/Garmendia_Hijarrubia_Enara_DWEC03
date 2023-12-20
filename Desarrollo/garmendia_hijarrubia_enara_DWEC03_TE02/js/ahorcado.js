'use strict'

// VARIABLES -------------------------------------------------------------------------------------------

// Array de palabras con su categoría
var listaPalabras = [["pera", "Una fruta..."], ["jirafa", "Un animal..."], ["Higuera", "Un árbol..."], 
["acelga", "Una verdura..."], ["Italia", "Un país..."], ["Barcelona", "Una ciudad..."], ["platano", "Una fruta..."], 
["elefante", "Un animal..."], ["Marruecos", "Un país..."], ["Bilbao", "Una ciudad..."]];

// Nº aleatorio
var rand;
var palabraAdivinar = [];
var palabraOculta = [];
var historialLetrasUsuario = [];

// Elemento html de la palabra
var hueco_guiones = document.getElementById("palabraAdivinar");

// Contador de intentos
var numIntentos = 6;

// Los elementos de los botones
const boton1 = document.getElementById("btn-empezar");
const boton2 = document.getElementById("btn-comprobar");

// Deshabilita el segundo botón
boton2.disabled = true;

var letraUsuario = document.getElementById('letraInput')
var contIntentos = document.querySelector('#intentos');
var historial = document.querySelector('#historial');

// FUNCIONES 

// Función para habilitar el segundo botón cuando se pulse el primero
function habilitarBoton2() {
  boton2.disabled = false;
}

// Añade un evento click al primer botón para llamar a la función
boton1.addEventListener("click", habilitarBoton2);

// Escoger palabra al azar. Usaremos el método 'Math.random()' para que nos elija un elemento del array 
// y como nuestro array tiene 10 elementos, pondremos 9, porque empezamos con el índice 0
function generaPalabra() {

  // Refrescamos la página para volver a jugar
  // Cargamos la primera imagen y borramos el contenido del input cada vez que pulsamos empezar
  document.getElementById("imagen").src = "img/ahorcado_6.png";
  letraUsuario.value = "";
  contIntentos.textContent = 6;
  historial.textContent = "";
  rand = (Math.random() * 9).toFixed(0);
  palabraAdivinar = listaPalabras[rand][0].toUpperCase();
  console.log(palabraAdivinar);
  categoria();
  pintarGuiones(palabraAdivinar.length);
}

// Obtener Categoría
function categoria() {
  document.getElementById("hueco-cat").innerHTML = listaPalabras[rand][1];
}

// Funcion para pintar los guiones de la palabra
function pintarGuiones(num) {

  // Array dónde vamos almacenando los guiones en base a la cantidad de letras de la palabra a adivinar
  palabraOculta = [];

  // bucle para ir guardando en el array los guiones en base a la longitud de la palabra a adivinar
  for (var i = 0; i < num; i++) {
    palabraOculta[i] = "_";
  }

  // Usamos el método join(), que crea y devuelve un String concatenando todos los elementos del array
  // Le indicamos que nos separe los caracteres con un espacio(por defecto, usa la coma como separador)
  hueco_guiones.innerHTML = palabraOculta.join(" ");
}

// Función que comprueba la letra que ha introducido el usuario y sustituye los guiones por la letra acertada
function comprobarLetraUsuario () {

  // Guardo la letra del input que ha escrito el usuario en una variable
  let letraUsuariotx = letraUsuario.value.toUpperCase();

  // Vaciamos el input para que el usuario pueda volver a escribir
  letraUsuario.value = '';

  // Le devolvemos el foco al input para que pueda introducir otra letra
  letraUsuario.focus();
  
  // Comprobamos que se ha introducido una letra de la A a la Z, con y sin tilde e incluyendo la Ñ
  if (comprobarLetraValida(letraUsuariotx) == true) {

      // Recorremos todas las letras para saber si alguna esta bien
    for (var i = 0; i < palabraAdivinar.length; i++) {

      // Comprobamos si la letra del usuario es igual a la letra a adivinar
      if (letraUsuariotx == palabraAdivinar[i]) {

      // Sustituimos el guion por la letra acertada
        palabraOculta[i] = letraUsuariotx;
      }
    }

    // En caso de no haber coincidencia con la letra
    if (!palabraAdivinar.includes(letraUsuariotx)) {

        // Restamos un intento
        numIntentos -= 1;

        // Usamos el valor de numIntentos para que cambie a la siguiente imagen
        document.getElementById("imagen").src = "img/ahorcado_" + numIntentos + ".png";

        // Guardamos en el historial la letra erronea pulsada por el usuario
        historialLetrasUsuario.push(letraUsuariotx);
    }

    // Mostramos los cambios
    redibujarJuego();

    // Comprobamos si hay que terminar el juego
    terminaJuego();
    }else {

    // En caso de no introducir nada o una letra no válida, muestra mensaje
    alert('Por favor, introduzca una letra válida del abecedario');
  }
}

// Función que redibuja lo que ve el usuario con los cambios
function redibujarJuego () {

  // Convertimos un array en un texto, separado por espacios, y lo mostramos en el div resultado
  hueco_guiones.textContent = palabraOculta.join(' ');

  // Mostramos los intentos
  contIntentos.textContent = numIntentos;

  // Mostramos el historial de letras introducidas, separado por comas + espacio
  historial.textContent = historialLetrasUsuario.join(", ");
}

// Función para comprobar y filtrar, si se ha introducido una letra y que sea válida
function comprobarLetraValida(letraUsuariotx) {

  // Comprobar si el valor es de una letra de la A a la Z, incluyendo la Ñ y las letras acentuadas
  var esLetra = /^[a-zA-ZñÑáéíóúÁÉÍÓÚ]+$/.test(letraUsuariotx);

  // Si el usuario no introduce ninguna letra o no es una letra entre la A y la Z, devuelve false
  // Si es válida, devuelve true
  if (!esLetra || letraUsuariotx === "") {
    return false;
  } else {
    return true;
  }
}

// Función para comprobar si se ha pulsado la tecla Enter
function comprobarPulsarEnter (evento) {
  if (evento.code == 'Enter') {
      comprobarLetraUsuario();
  }
}

// Función que verifica si se ha acabado el juego
function terminaJuego () {

  // Ha ganado: ¿Le queda guiones al jugador?
  if (!palabraOculta.includes('_')) {

    // Mostramos una máscara color verde que estaba oculta sobre la pantalla
    var redMask = document.querySelector('#green-mask');
    redMask.style.display = 'block';
    setTimeout(function() {

      // Alert que que se ejecutará tras 1 segundo segundos mostrando mensaje de felicitación
      alert('FELICIDADES!!! Exacto! La palabra secreta era: ' + palabraAdivinar);

      // Refrescamos la página para volver a jugar
      location.reload(true);
    }, 1000);
  }

  // Si le quedan 0 intentos, game Over
  if (numIntentos == 0) {

    // Mostramos una máscara color rojo que estaba oculta sobre la pantalla
    var redMask = document.querySelector('#red-mask');
    redMask.style.display = 'block';
    setTimeout(function() {

      // Alert que que se ejecutará tras 1 segundo segundos mostrando que hemos perdido
      alert('GAME OVER. La palabra secreta era: ' + palabraAdivinar);

      // Refrescamos la página para volver a jugar
      location.reload(true);
    }, 1000); 
  }
}

// EVENTOS

// Le damos evento de escucha al campo input, para que además de pulsando el botón, 
// también llame a la funcion comprobarLetraUsuario si se pulsa ENTER con el teclado
letraUsuario.addEventListener('keyup', comprobarPulsarEnter);
