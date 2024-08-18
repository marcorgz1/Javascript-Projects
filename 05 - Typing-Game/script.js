// Importar el array con las palabras ubicado en el fichero "data.js"
import { words as INITIAL_WORDS } from './data.js'

// Obtener los elementos del juego
const $time = document.querySelector("time");
const $paragraph = document.querySelector("p");
const $input = document.querySelector("input");
const $game = document.querySelector('#game')
const $results = document.querySelector('#results')
// Recuperar el primer elemento h4 (donde se guarda el wpm)
const $wpm = document.querySelector('h4')
// Recuperar el último elemento h4 (donde se guarda el accuracy)
const $accuracy = document.querySelector('h4:last-child')

// Constante que guarda el tiempo inicial del juego
const INITIAL_TIME = 30;

// Texto inicial del juego
// const INITIAL_TEXT = 'lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse quam libero, posuere non dui vel, tincidunt lobortis nibh. Nunc auctor risus vitae leo facilisis, non aliquet risus porttitor. Vestibulum consectetur convallis quam, a gravida odio maximus et. Maecenas lectus erat, ultricies quis elementum sit amet, pharetra sit amet odio. Praesent lorem ante, lobortis eget velit vitae, sodales tincidunt purus. Vivamus posuere blandit elementum.'
// Array para almacenar las palabras generadas aleatoriamente desde el array del fichero "data.js"
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
    // Ordenar las palabras del array "words" del fichero "data.js" aleatoriamente,
    // quedarse solo con las 40 primeras palabras de ese array ordenado y guardarlas en 
    // el array vacío de la variable "words"
    words = INITIAL_WORDS.toSorted(() => Math.random() - 0.5).slice(0, 50)
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

// Función para manejar los eventos del juego
function initEvents () {
    // Ejecutar una función cuando se escuche el evento "keydown"
    document.addEventListener('keydown', () => {
        // Llamar al método "focus" para que se pueda escribir en el elemento input nada 
        // más se cargue la página
        $input.focus()
    })

    // Hacer que el input escuche el evento "keydown" y llame a la función "onKeyDown" cuando el usuario
    // presione una tecla
    $input.addEventListener('keydown', onKeyDown)
    // Hacer que el input escuche el evento "keyup" y llame a la función "onKeyUp" cuando el usuario
    // deje de presionar una tecla
    $input.addEventListener('keyup', onKeyUp)

    // Función que realiza una serie de acciones cuando el usuario presiona una tecla    
    function onKeyDown (event) {
        // Recuperar la palabra actual que está activa en el párrafo del DOM
        const $currentWord = $paragraph.querySelector('n-word.active')
        // Recuperar la letra actual que está activa en la palabra actual que está activa del párrafo del DOM
        const $currentLetter = $currentWord.querySelector('n-letter.active')

        const { key } = event
        console.log(key)

        if (key === ' ') {
            // Evitar comportamiento por defecto cuando se presiona el espacio
            // Evitar que se escriba el espacio en el input (si se quita, se mostrará el espacio en el input)
            event.preventDefault()
            // Recuperar la siguiente palabra del párrafo del DOM
            // Buscar el elemento que es hermano de la palabra actual
            const $nextWord = $currentWord.nextElementSibling
            // Recuperar la primera letra de la siguiente palabra
            // Obtener la primera letra de la siguiente palabra
            const $nextLetter = $nextWord?.querySelector('n-letter')

            // Eliminar la clase "active" tanto a la palabra como a la letra actual ya que 
            // la que está activa ahora es la siguiente palabra y letra
            // Además, eliminar a la palabra actual la clase "marked" ya
            $currentWord.classList.remove('active')
            $currentLetter.classList.remove('active')

            // Añadir la clase "active" a la palabra siguiente
            $nextWord.classList.add('active')
            // Añadir la clase "active" a la letra siguiente
            $nextLetter.classList.add('active')
            // Vaciar el input cuando se pase a la siguiente palabra para
            // que no se mantenga la anterior palabra ya que daría error
            $input.value = ''
            // Cuando alguna de las letras de la palabra actual no tengan la clase "correct" y
            // además la longitud de la palabra sea mayor a 0, significa que faltan letras por escribir (ya que para que esté escrita competamente, 
            // la longitud tiene que ser 0)
            const missedLetters = $currentWord.querySelectorAll('n-letter:not(.correct)').length > 0
            // Si faltan letras por escribir en la palabra actual, añadirles la clase "marked",
            // sino faltan palabras por escribir, añadirle a la palabra actual la clase "correct" 
            const classToAdd = missedLetters ? 'marked' : 'correct'
            // Aplicar la clase correspondiente a la palabra actual dependiendo de la condición cumplida
            $currentWord.classList.add(classToAdd)
            return
        }

        // Si el usuario presiona la tecla de borrar
        if (key === 'Backspace') {
            // Recuperar la palabra anterior
            // Acceder al elemento anterior que coincida con el elemento actual
            // Buscar antes del elemento "word" del DOM si existe otro igual a él
            const $previousWord = $currentWord.previousElementSibling
            // Recuperar la letra anterior
            // Acceder al elemento anterior que coincida con el elemento actual
            // Buscar antes del elemento "letter" del DOM si existe otro igual a él
            const $previousLetter = $currentLetter.previousElementSibling

            // Si existe una letra anterior y esta contiene la clase "correct"
            if ($previousLetter && $previousLetter.classList.contains('correct')) {
                // Evitar el comportamiento por defecto de la tecla de retroceso
                event.preventDefault()
                // Cuando la letra anterior tenga la clase "correct" evitar que se pueda retroceder cuando se presiona la tecla de retroceso
                return
            }

            if (!$previousWord && $previousLetter) {
                event.preventDefault()
                return
            }

            // Volver a la última letra escrita de la palabra anterior cuando el usuario haya presionado el espacio y quiera volver

            // Permitir al cursor ir para atrás si existe una palabra marcada (ya que si está amarcada es porque está mal, 
            // por lo que queremos solucionarla)
            // Recuperar la palabra marcada
            // Accedemos al primer elemento "n-word" del párrafo
            const $markedWord = $paragraph.querySelector('n-word.marked')
            
            // Si tenemos una palabra marcada y no tenemos una letra anterior
            if ($markedWord && !$previousLetter) {
                // Evitar comportamiento por defecto cuando se presiona el espacio
                // Evitar que se escriba el espacio en el input (si se quita, se mostrará el espacio en el input)
                event.preventDefault()
                // Elimnarle a la palabra anterior la clase "marked" para que se elimine el subrayado ya que como hemos vuelto ya la palabra no está mal
                $previousWord.classList.remove('marked')
                // Añadirle nuevamente a la palabra anterior la clase "active" para posicionar el cursor en la última letra escrita
                $previousWord.classList.add('active')

                // Recuperar la última letra escrita
                // De la palabra anterior, obtener el último elemento (last-child) "n-letter" que haya
                const $lastTypedLetter = $previousWord.querySelector('n-letter:last-child')

                // Eliminar la clase "active" a la letra actual ya que como hemos vuelto a la última letra escrita, 
                // la actual ya no es la que está activa
                $currentLetter.classList.remove('active')
                // Añadirle a la letra actual la clase "active" ya que es la que
                // ahora está activa
                $lastTypedLetter.classList.add('active')

                // Limpiar el input cuando ya se haya vuelto a la última letra 
                // escrita (para que no se mantenga lo anterior escrito y dé error)
                // Las llaves se utilizan para transformar lo que devuelve el querySelectorAll (que es una "NodeList" lo que devuelve)
                // en un array
                $input.value = [
                    // Recuperar todas la letras (tanto correctas como incorrectas) escritas por el usuario
                    ...$previousWord.querySelectorAll('n-letter.correct, n-letter.incorrect')
                // Recorrer cada uno de los elementos del array anterior
                ].map($elem => { 
                    // Verificar si el elemento del array que se está recorriendo tiene o no la clase "correct"
                    // Si la tiene, posicionar el cursor depsués de la última letra correcta
                    // Si no la tiene, eliminar todas las clases que tengan las letras 
                    return $elem.classList.contains('correct') ? $elem.innerText : '*'
                // Unir todos los elementos del array anterior en un único string
                }).join('')
            }
        }

    }
    function onKeyUp () {
        // Recuperar la palabra actual que está activa en el párrafo del DOM
        const $currentWord = $paragraph.querySelector('n-word.active')
        // Recuperar la letra actual que está activa en la palabra actual que está activa del párrafo del DOM
        const $currentLetter = $currentWord.querySelector('n-letter.active')

        // Recuperamos la palabra actual que tiene que escribir el usuario
        const currentWord = $currentWord.innerText.trim()
        // Limitar el número de letras que se puede escribir en el input
        // El límite de letras que se puedan escribir será el número de letras que tenga la palabra actual
        $input.maxLength = currentWord.length
        console.log({ value: $input.value, currentWord })

        // Obtener todas las letras de la palabra actual
        // Recuperar cada uno de los elementos letter de la palabra actual
        const $letters = $currentWord.querySelectorAll('n-letter')
        // Eliminar las clases "correct" e "incorrect" de las letras cuando se vuelva a cargar la página
        // Recorrer cada una de las letras de "$letters" y eliminarles la clase "correct" o "incorrect" dependiendo de cuál tenga
        $letters.forEach($letter => $letter.classList.remove('correct', 'incorrect'))

        // Obtener el valor actual del elemento input y convertirlo en un array (con el método split) 
        // y recorrer cada uno de los elementos del mismo
        $input.value.split('').forEach((elem, index) => {
            // Recuperar la letra actual
            // Obtener la letra actual accediendo al índice actual que se está recorriendo en el array "letters"
            const $letter = $letters[index]
            // Recuperar la letra actual que debemos de comprobar (comprobar que es igual a 
            // la letra que se está recorriendo actualmente)
            const letterToCheck = currentWord[index]
            // Si la igualdad entre la letra que ha escrito el usuario y la letra actual 
            // que se está recorriendo es correcta
            const isCorrect = elem === letterToCheck

            // Si la igualdad es correcta, añadirle a la letra la clase CSS "correct"
            // Por el contrario, si la igualdad en incorrecta, es decir, no son iguales, añadirle a la letra actual la clase CSS "incorrect"
            const classLetter = isCorrect ? 'correct' : 'incorrect'
            // Añadirle a la letra la clase correspondiente
            $letter.classList.add(classLetter)
        })

        // Quitarle la clase "active" a la letra que ya ha escrito el usuario
        // para que el cursor pase a la siguiente
        $currentLetter.classList.remove('active', 'last')
        // Crear movimiento del cursor
        // Obtener la longitud del input
        const inputLength = $input.value.length
        // Recuperar la siguiente letra del texto
        const $nextLetter = $letters[inputLength]

        // Si existe una siguiente letra
        if ($nextLetter) {
            // Añadirle a la siguiente letra la clase "active" para que se muestre 
            // el cursor antes de esta
            $nextLetter.classList.add('active')
        // Si no existe una letra después
        } else {
            // Mostrar el cursor (clase "active") a la derecha de la letra actual (clase "last")
            $currentLetter.classList.add('active', 'last')
            // TODO: Mostrar "GAME OVER" cuando no haya siguiente letra
        }
    }
    // Función para mostrar las estadísticas de la partida cuando ésta termina
    function gameOver () {
        // Cuando termina el juego

        // Dejar de mostrar las palabras para escribir
        $game.style.display = 'none'
        // Mostrar las resultados de la partida
        $results.style.display = 'flex'

        // Recuperar el número de palabras correctas que ha tenido el usuario durante la partida
        // Recuperar el número de elementos "n-word" que tengan la clase "correct"
        const correctWords = document.querySelectorAll('n-word.correct').length
    }
}