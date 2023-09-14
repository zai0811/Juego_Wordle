
let nroIntentos = 6;
let diccionario = ['APPLE', 'HURLS', 'WINGS', 'YOUTH'];
let caracteresAcertados = 0;

// Palabra seleccionada de la lista para comparar
const palabra = diccionario[Math.floor(Math.random() * diccionario.length)];

// Función para actualizar la vista con los intentos restantes
function actualizarIntentos() {
    const intentosRestantes = document.getElementById("idIntentos");
    intentosRestantes.innerHTML = nroIntentos;
}

// Función para manejar el intento del jugador
function intentar() {
    const GRID = document.getElementById("grid");
    //crea la etiqueta "div" que va contener el numero de columnas de una fila y pone el estilo "row"(style.css)
    const ROW = document.createElement('div');
    ROW.className = 'row';
    let palabraIngresada = document.getElementById("guess-input").value.toUpperCase(); // Convertir a mayúsculas para comparar

    if (nroIntentos > 0 && (palabraIngresada.length == palabra.length)) {
        for (let i = 0; i < palabraIngresada.length; i++) {
            //crea la etiqueta "spam" que son cada uno de los elementos de l fila  y llama al estilo  "letter"(style.css)
            const SPAN = document.createElement('span');
            SPAN.className = 'letter';
            //va cambiando el color dependiendo del estado
            //si acierta la letra en esa posicion "caracteresAcertados" suma 1
            if (palabraIngresada[i] === palabra[i]) {
                caracteresAcertados++;
                SPAN.innerHTML = palabraIngresada[i];
                SPAN.style.backgroundColor = 'green';
            } else if (palabra.includes(palabraIngresada[i])) {
                SPAN.innerHTML = palabraIngresada[i];
                SPAN.style.backgroundColor = 'yellow';
            } else {
                SPAN.innerHTML = palabraIngresada[i];
                SPAN.style.backgroundColor = 'gray';
            }

            ROW.appendChild(SPAN);
        }
        //agrega una fila a la grilla cuando termina de comparar todas las letras
        GRID.appendChild(ROW);
        nroIntentos--;
        actualizarIntentos();

        if (caracteresAcertados === palabra.length) {
            terminar("GANASTE");
        } else if (nroIntentos === 0) {
            terminar("PERDISTE");
        }
    } else {
        // si ingresa una palabra mayor a numero que deberia muestra un mensaje
        mostrarMensaje("debes ingresar " + palabra.length + " letras")
    }
}

function terminar(mensaje) {
    mostrarMensaje(mensaje);
    //deshabilita el boton  y la caja de texto
    document.getElementById("guess-input").disabled = true;
    document.getElementById("guess-button").disabled = true;
}

function mostrarMensaje(mensaje) {

    const modal = document.getElementById("myModal");
    const mensajeModal = document.getElementById("modal-message");
    //dispara un modal cuanndo termine el juego
    if (mensaje=="PERDISTE"){
        mensajeModal.style.color = 'red'
        mensajeModal.innerHTML = mensaje;
    }
    else if (mensaje=="GANASTE"){
        mensajeModal.style.color = 'green'
        mensajeModal.innerHTML = mensaje;
    }
    else {
        // si ingresa una palabra mayor a numero que deberia muestra un mensaje
        mensajeModal.innerHTML = mensaje;
    }
    modal.style.display = "block";
    //accion que realiza para cerrar el modal
    const closeModalButtons = document.getElementsByClassName("close");
    for (let i = 0; i < closeModalButtons.length; i++) {
        closeModalButtons[i].addEventListener("click", function () {
            const modal = document.getElementById(this.getAttribute("data-target"));
            modal.style.display = "none";
        });
    }
}
// Agregar un event listener al botón de "Intentar"
const button = document.getElementById("guess-button");
button.addEventListener("click", intentar);
const reiniciar=document.getElementById("reiniciar");
reiniciar.addEventListener("click", "load");
// inicialmente va mostrar los intentos disponibles
actualizarIntentos();


