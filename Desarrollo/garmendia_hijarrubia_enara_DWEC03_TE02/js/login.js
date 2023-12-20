'use strict'

// Comprobamos si el navegador web tiene disponible la funcionalidad del localstorage y pintamos por consola respuesta
if (typeof(Storage) !== "undefined") {
    console.log('LocalStorage disponible')
} else {
    console.log('no soportado en este navegador')
}

// Función para obtener los datos del archivo.json y subirlos al localStorage
// Usamos localStorage.setItem(), para recibir un par clave-valor y añadirla al almacenamiento local
// Usamos el método JSON.stringify(), para convertir un objeto o valor de JavaScript en una cadena 
// de texto JSON, ya que el localstorage no permite guardar objetos de JavaSciprt como tal
function cargarUsuarios(){
    let path = '../model/usuarios.json';

    let request = new Request(path, {
        headers: new Headers({
            'Content-Type': 'text/json'
        }),
        method: 'GET'
        })

    fetch(request).then(response => {
        response.json().then(data => {
            console.log('Datos', data);
            localStorage.setItem('usuarios', JSON.stringify(data));
        })
        
    })
}

// Verifica si el LocalStorage ya tiene los datos cargados y sino llamamos a la función cargarUsuarios()
// Pintamos por consola si los datos se han cargado o si ya están cargados de antes
if (!localStorage.getItem('usuarios')) {
    cargarUsuarios();
    console.log('Los datos se han cargado en el LocalStorage');

} else {
    console.log('Los datos ya están cargados en el LocalStorage');
}

//Obtener referencia a los elementos del formulario
var formulario = document.getElementById("formlogin");

// Agrega un evento de escucha para cuando se envíe el formulario (submit)
formulario.addEventListener("submit", function(event) {

    // Evita que el formulario se envíe de forma automática
    event.preventDefault(); 

    // Obtenemos los textos introducidos por el usuario en los campos usuario y contraseña
    var usuarioInput = document.getElementById("usuario").value;
    var contrasenaInput = document.getElementById("contrasena").value;

    // Guardamos en una variable los usuarios que descargamos de localStorage
    // Usamos el método JSON.parse(), para parsear un string JSON a un valor u objeto JavaScript 
    var usuariosRegistrados = JSON.parse(localStorage.getItem("usuarios"));

    // Declaramos variable de usuario Válido en false
    var usuarioValido = false;

    // Verifica si los datos coinciden con alguno de los usuarios del LocalStorage
    for (var usuarioRegistrado of usuariosRegistrados) {
        if (usuarioRegistrado.usuario === usuarioInput && usuarioRegistrado.contraseña === contrasenaInput) {
        
        // Si encuentra almacenados un usuario y contraseña que coincidan, el valor de usuarioValido, cambiará a true 
        usuarioValido = true;
        }
    }

    if (usuarioValido == true) {

        // En caso de haber coincidencia en los datos usuario y contraseña redirecciona a la página del juego
        window.location.href = "ahorcado.html";
    } else {

        // Si no hay coincidencia en los datos, validamos la contraseña utilizando una expresiones regulares
        // Obtenemos la expresión regular que coincide con los caracteres permitidos en la contraseña
        const regexContraseña = /^[0-9a-zA-Z]+$/;

        // Recorremos la contraseña carácter a carácter
        for (let i = 0; i < contrasenaInput.length; i++) {

            // Comprobamos si el carácter no coincide con la expresión regular
            if (!regexContraseña.test(contrasenaInput[i])) {

                // Si no coincide, mostramos un mensaje de error y el carácter especial
                alert("La contraseña no es válida. El caracter especial que ha introducido es: " 
                + contrasenaInput[i]);
                console.log(contrasenaInput)
            }
        }
        
        // Muestra dinámicamente un mensaje de error con un campo de texto en color rojo
        document.getElementById("mensaje").innerHTML = 
        "<p style='background-color: red; border: 2px solid black; text-align: center; padding: 1%;'>El usuario no está registrado</p>";
    }
});