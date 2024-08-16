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
// Inicializar una variable "playing" que va a cambiar en función de si el usuario esté jugando o no
let playing

// Llamar a las funciones posteriores para que se ejecuten
initGame()
initEvents()

// Función para manejar el juego
function initGame () {
    // Convertir la cadena de texto guardada en la variable "INITIAL_TEXT" en un array separando cada una de las palabras de esta cuando exista un espacio en blanco y guardar este nuevo array en la variable "words"
    // Una vez la cadena de texto se ha convertido en un array, obtener solo las 32 primeras palabras
    words = INITIAL_TEXT.split(' ').slice(0, 37)
    // Siempre que se inicie el juego, cargar el tiempo inicial
    currentTime = INITIAL_TIME

    // Mostrar en el DOM el tiempo actual del juego
    $time.textContent = currentTime
    // Mapear cada una de las palabras del array que hemos creado anteriormente
    $paragraph.innerHTML = words.map((word, index) => {
        // Dividir cada una de las palabras del array para crear un nuevo array en el 
        // que cada elemento de este sea una de las letras de la palabra
        const letters = word.split('')

        // Devolver un HTML con cada letra contenida en el array
        // Mapear cada una de las letras del array para mostrarlas y unirlas
        // Al añadir un prefijo por delante de la etiqueta HTML, estamos creando un custom element
        return `<n-word>     
            ${letters.map(letter => `<n-letter>${letter}</n-letter>`).join('')}
        </n-word>`
    // .join(''): Eliminar la coma que existe después de cada palabra
    }).join('')

    // Obtener el primer elemento word del elemento p del DOM
    const $firstWord = $paragraph.querySelector('n-word')
    // Añadirle a la primera palabra del párrafo 
    $firstWord.classList.add('active')
    // Obtener la primera letra de la primera palabra del elemento p del DOM
    const $firstLetter = document.querySelector('n-letter')
    // Añadirle a la primera letra de la primera palabra del elemento p del DOM la clase CSS "active"
    $firstLetter.classList.add('active')

    // Añadirle a 

    const intervalId = setInterval(() => {
        // Decrementar el tiempo actual
        currentTime--
        // Actualizar el elemento "time" del HTML cada vez que cambie el tiempo actual
        $time.textContent = currentTime

        // Si el la cuenta atrás llega a 0
        if(currentTime === 0) {
            // Limpiar el intervalo de tiempo para que no empiece a decrementar con números negativos
            clearInterval(intervalId)            
            gameOver()
        }
    // Decrementar el intervalo de tiempo cada 1000 milisegundos
    }, 1000)    
}

function gameOver () {
    console.log('Game over')
}

// Función para manejar los eventos del juego
function initEvents () {
    // Ejecutar una función cuando se escuche el evento "keydown"
    document.addEventListener('keydown', () => {
        // Llamar al método "focus" para que se pueda escribir en el elemento input nada 
        // más se cargue la página
        $input.focus()
    })

    // Llamar a la función "onKeyDown" que se encarga de controlar el comportamiento cuando 
    // el usuario presiona una tecla
    document.addEventListener('keydown', onKeyDown)
    // Llamar a la función "onKeyUp" que se encarga de controlar el comportamiento cuando 
    // el usuario deja de presionar una tecla
    document.addEventListener('keyup', onKeyUp)

    function onKeyDown () {}
    function onKeyUp () {}
}