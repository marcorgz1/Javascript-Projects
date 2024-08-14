// Obtener los elementos del juego
const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");

// Constante que guarda el tiempo inicial del juego
const INITIAL_TIME = 30;

// Texto inicial del juego
const INITIAL_TEXT = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quam libero, posuere non dui vel, tincidunt lobortis nibh. Nunc auctor risus vitae leo facilisis, non aliquet risus porttitor. Vestibulum consectetur convallis quam, a gravida odio maximus et. Maecenas lectus erat, ultricies quis elementum sit amet, pharetra sit amet odio. Praesent lorem ante, lobortis eget velit vitae, sodales tincidunt purus. Vivamus posuere blandit elementum.'

let words = []
// Guardar el tiempo actual del juego (por defecto es el tiempo inicial)
let currentTime = INITIAL_TIME

// Llamar a las funciones posteriores para que se ejecuten
initGame()
initEvents()

// Función para manejar el juego
function initGame () {
    // Convertir la cadena de texto guardada en la variable "INITIAL_TEXT" en un array separando cada una de las palabras de esta cuando exista un espacio en blanco y guardar este nuevo array en la variable "words"
    // Una vez la cadena de texto se ha convertido en un array, obtener solo las 32 primeras palabras
    words = INITIAL_TEXT.split(' ').slice(0, 32)
    // Siempre que se inicie el juego, cargar el tiempo inicial
    currentTime = INITIAL_TIME

    // Mostrar en el DOM el tiempo actual del juego
    $time.textContent = currentTime
}

// Función para manejar los eventos del juego
function initEvents () {}