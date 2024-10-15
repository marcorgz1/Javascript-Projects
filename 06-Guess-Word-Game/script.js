// Abreviar el "document.querySelector"
const $ = elem => document.querySelector(elem)

// Recuperar elementos del DOM
const $textInput = $('.type-input')
const $wordToGuess = $('.word')
const $hint = $('.hint')
const $hintText = $('.hint span')
const $guesses = $('.guess span')
const $mistakes = $('.wrong span')
const $resetBtn = $('#reset-game-btn')
const $showHintBtn = $('#show-hint-btn')
const $winMessage = $('#win-message')

// Variables
// Almacenar la palabra a adivinar
let chosenWord
// Guardar en un array las letras fallidas del usuario
let incorrectLetters = []
// Guardar en un array las letras acertadas por el usuario
let correctLetters = []
// Guardar el número máximo de intentos
let maxGuesses

// Función que elige una palabras aleatoria de la lista de palabras y permite iniciar
// el juego utilizando dicha palabra
function startGame () {
    alert('Ha empezado un nuevo juego! Adivina la siguiente palabra: ')
    
    $hintText.style.display = 'none'

    // Elegir palabra aleatoria de la lista de palabras
    // Obtener un número entre el 0 (incluido) y el 1 (excluido) (Math.random()) y dicho número
    // redondondearlo hacia abajo (Math.floor())
    // Una vez obtenido dicho número y haberlo redondeado, multiplicarlo por la longitud
    // del array "wordList" y el número que diese como resultado sería la 
    // palabra escogida
    const chooseRandomWord = wordList[Math.floor(Math.random() * wordList.length)]
    // Guardar la palabra obtenida aleatoriamente en la variable "chosenWord"
    chosenWord = chooseRandomWord.word

    // Si el número de letras de la palabra es mayor o igual a 5, indicar que el
    // número máximo de oportunidades es 8, si no lo es, el máximo de oportunidades
    // será 6
    maxGuesses = chosenWord.length >= 5 ? 8 : 6
    // Llamar a las variables "incorrectLetters" y "correctLetters" para que almacenen
    // las letras correectas e incorrectas
    incorrectLetters = []
    correctLetters = []
    // Mostrar la pista de la palabra en el DOM
    $hintText.innerText = chooseRandomWord.hint
    $guesses.innerText = maxGuesses
    $mistakes.innerText = incorrectLetters

    $wordToGuess.innerHTML = ''
    // Crear un elemento input en el DOM para cada una de las letras de la palabra
    for (let i = 0; i < chosenWord.length; i++) {
        const letterInput = document.createElement('input')
        // Por defecto, el input de cada letra estará desactivado ya que no se puede
        // escribir en él
        letterInput.disabled = true
        // Añadir los input al contenedor con clase "word" del DOM
        $wordToGuess.appendChild(letterInput)
    }
}

function handleInput (event) { 
    // Recuperar únicamente los carácteres que son letras minúsculas (ignorar tanto
    // los carácteres que no son letras minúsculas como las letras que ya han sido
    // adivinadas)
    const key = event.target.value.toLowerCase()

    if (key.match(/^[a-z]+$/i) && !incorrectLetters.includes(key) 
    && !correctLetters.includes(key)) {
        // Si la letra actual está en la palabra
        if (chosenWord.includes(key)) {
            // Actualizar la palabra que se tiene que adivinar añadiéndole dicha letra
            for (let i = 0; i < chosenWord.length; i++) {
                // Si la posición actual que se está recorriendo de la palabra a adivinar
                // es la letra actual
                if (chosenWord[i] === key) {
                    // Recuperar el elemento input del DOM y escribir en él la letra adivinada
                    $wordToGuess.querySelectorAll('input')[i].value += key
                }
            }

            // Añadir la letra actual al array "correctLetters" ya que dicha letra estaba
            // en la palabra
            correctLetters += key
        // Por otro lado, si la letra actual no está en la palabra a adivinar
        } else {
            // Decrementar el contador de intentos
            maxGuesses--
            // Agregar la letra actual que no está en la palabra que hay que adivinar al
            // array "incorrectLetters"
            incorrectLetters.push(`${key}`)
            // Escribir en el elemento span del párrafo con clase "wrong" del DOM la 
            // letra incorrecta
            $mistakes.innerText = incorrectLetters
        }
    }

    $guesses.innerText = maxGuesses

    // Si la longitud del array que contiene las letras correctas y la longitud de la palabra
    // a adivinar coinciden, significa que el usuario ha adivinado la palabra
    if (correctLetters.length === chosenWord.length) {
        $winMessage.textContent = 'Felicidades!! Has adivinado la palabra'
        // LLamar a la función "startGame" para que se vuelva a iniciar el juego una vez el
        // usuario ha adivinado la palabra
        // startGame()
        // Deshabilitar elemento input para que no se puedan escribir mas letras una vez el juego haya
        // terminado 
        $textInput.disabled = true
        // Por otro lado, si el usuario se queda sin intentos
    } else if (maxGuesses < 1) {
        $winMessage.innerHTML = `Vaya!! No te quedan más intentos. La palabra era: <strong>${chosenWord.toUpperCase()}</strong>`
        // Deshabilitar elemento input para que no se puedan escribir mas letras una vez el juego haya
        // terminado   
        $textInput.disabled = true
        // Rellenar cada elemento input con la letra correspondiente para mostrar la palabra que
        // había que adivinar
        for (let i = 0; i < chosenWord.length; i++) {
            // Agregar letra correspondiente al input que se está recorriendo
            $wordToGuess.querySelectorAll('input')[i].value = chosenWord[i]
        }
    }

    // Limpiar el contenido del input de cada letra
    $textInput.value = ""
}

// Función para mostrar la pista correspondiente al usuario
function showHint () { 
    $hintText.style.display = 'inline'
    $hintText.style.opacity = '1'
}

// LLamar a la función "startGame" cuando se haga click en el botón de reiniciar el juego
$resetBtn.addEventListener('click', startGame)
// Mostrar pista correspondiente al usuario cuando se haga click en el botón de mostrar pista
$showHintBtn.addEventListener('click', showHint)
// LLamar a la función "handleSubmit" cuando el usuario haga click en el elemento input del DOM
$textInput.addEventListener('input', handleInput)
$wordToGuess.addEventListener('click', () => $textInput.focus())
document.addEventListener('keydown', () => $textInput.focus())

startGame()