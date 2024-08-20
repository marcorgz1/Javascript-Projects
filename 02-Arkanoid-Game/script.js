// Obtener el elemento "canvas" del DOM
const canvas = document.querySelector('canvas')
// Crear un contexto para poder dibujar en el canvas
const ctx = canvas.getContext('2d') //  Existen otros tipos de contexto como el Webgl, Webgl2 o bitmaprenderer
// Recuperar las imágenes del sprite y de los bricks del DOM
const sprite = document.querySelector('#sprite')
const bricks = document.querySelector('#bricks')

// Definir el ancho y el alto del canvas
canvas.width = 700
canvas.height = 550

// ! VARIABLES DEL JUEGO

// * VARIABLES DE LA PELOTA
// Establecer el radio de la pelota (su tamaño)
const ballRadius = 6
// Guardar las posiciones X e Y de la pelota en el juego
// canvas.width / 2: Mostrar la pelota en la mitad del ancho del canvas, es decir, en el medio
let posX = canvas.width / 2
// canvas.height - 40: Mostrar la pelota 40 pixeles más abajo del centro del canvas
let posY = canvas.height - 30

// Establecer la velocidad de la pelota ("-2", más lenta, "-10", más rápida)
// Si el valor es negativo, la pelota irá hacia la izquierda, si es positivo hacia la derecha
let directionX = -2
// Si el valor de "directionY" es negativo, la pelota irá hacia arriba, si es positivo irá hacia abajo
let directionY = -2

// * VARIABLES DE LA PALETA
const paddleHeight = 10
const paddleWidth = 50

const PADDLE_SENSITIVITY = 3

// Mostrar la paleta en el centro del canvas
// Restar el ancho del canvas por el ancho de la raqueta y el resultado divdirlo entre 2
let paddleX = (canvas.width - paddleWidth) / 2
// Posicionar la paleta un poco más arriba del borde de abajo
let paddleY = canvas.height - paddleHeight - 10

// Definir variables para que cambienm su valor cuando se presionen la flecha derecha o izquierda del teclado
let rightPressed = false
let leftPressed = false

// * VARAIBLES DE LOS LADRILLOS
// Guardar el número de filas de ladrillos que queremos que haya
const bricksRowCount = 6
// Guardar el número de columnas de ladrillos que queremos que haya
const bricksColumnCount = 13
// Indicar el ancho y el alto de cada ladrillo
const brickWidth = 48
const brickHeight = 32

// Separación entre cada ladrillo
const brickPadding = 0
// Indicar la posición en la parte de arriba en la que empiezan los ladrillos
const brickOffsetTop = 50
// Indicar la posición en la parte de la izquierda en la que empiezan los ladrillos
const brickOffsetLeft = 40

// Array que contiene todos los ladrillos que tenemos
const numBricks = []

const BRICK_STATUS = {
    NO_DESTROYED: 1,
    DESTROYED: 0
}

// Bucle for para recorrer cada una de las columnas de bricks
for (let column = 0; column < bricksColumnCount; column++) {
    // Inicializar la iteración con un array vacío
    numBricks[column] = []
    // Bucle for para recorrer cada una de las filas de bricks
    for (let row = 0; row < bricksRowCount; row++) {
        // Posición en los ejes X e Y en la que se va a colocar cada uno de los ladrillos
        // Multiplicar la columna correspondiente por la suma del ancho del ladrillo más la separación correspondiente 
        // y al resultado sumarle el margen correspondiente de la izquierda
        const brickX = column * (brickWidth + brickPadding) + brickOffsetLeft
        // Multiplicar la fila correspondiente por la suma de la altura del ladrillo más la separación correspondiente 
        // entre cada uno y al resultado sumarle el margen correspondiente de arriba
        const brickY = row * (brickHeight + brickPadding) + brickOffsetTop

        // Asignar color aleatorio a cada ladrillo
        // Obtener número aleatorio entre 0 y 7
        // Math.floor: Redondear hacia abajo el número decimal obtenido entre 0 y 8 (es decir, obtendríamos un número entre 0 y 7)
        // Math.random() * 8: Obtener un número aleatorio entre 0 y 1 y multiplicarlo por 8
        const random = Math.floor(Math.random() * 8)
        // Guardar la info de cada ladrillo en un objeto
        numBricks[column][row] = {
            x: brickX, // Posición del ladrillo en el eje X
            y: brickY, // Posición del ladrillo en el eje Y
            status: BRICK_STATUS.NO_DESTROYED, // Inicializar estado del ladrillo como "no destruido"
            color: random // Indicar que los ladrillos vas a tener un color aleatorio
        }
    }
}

function drawBall () {
    // Indicarle al contexto del canvas que vamos a empezar a dibujar un trazado
    ctx.beginPath()
    // Dibujar un arco (indicar el lugar en el canvas donde queremos que se dibuje, el radio que queremos que tenga nuestra pelota 
    // e indicar los ángulos del principo y final de nuestra pelota)
    // 0, Math.PI * 2: Indicar que el ángulo del principio es 0 y que el ángulo del final es el número PI multiplicado por 2 para 
    // indicar que queremos que la pelota sea un círculo perfecto
    ctx.arc(posX, posY, ballRadius, 0, Math.PI * 2)
    // Indicar el color de relleno que queremos que tenga la pelota
    ctx.fillStyle = '#fff'
    // Dibujar el color de relleno en nuestra pelota
    ctx.fill()
    // Cerrar el trazado que hemos dibujado (ayuda con problemas de rendmineto y para evitar conflictos con otros trazados)
    ctx.closePath()

}

// Función que se encarga de dibujar la raqueta del juego
function drawPaddle () {
    // Dibujar la imagen del sprite en el canvas (queremos cargar solo la parte de la paleta)    
    ctx.drawImage(
        sprite, // imagen que queremos cargar 
        29, 174, // coordenadas iniciales por la que se quiere empezar a cargar la imagen
        paddleWidth, paddleHeight, // ancho y el alto que queremos que tenga la imagen (el ancho y el alto de la paleta)
        paddleX, paddleY, // posición en la que se tiene que pintar la imagen (en donde está la paleta)
        paddleWidth, paddleHeight // ancho y alto que queremos que tenga el propio dibujo que queremos cargar (la imagen de la paleta)
        // En este caso, el recorte de la imagen y el tamaño de la misma son iguales
    )
}

function drawBricks () { 
    for (let column = 0; column < bricksColumnCount; column++) {
        // Bucle for para recorrer cada una de las filas de bricks
        for (let row = 0; row < bricksRowCount; row++) {
            // Recuperar el brick actual de columna y la fila actual
            const currentBrick = numBricks[column][row]
            // Si el estado del brick actual es "DESTROYED"
            if(currentBrick.status === BRICK_STATUS.DESTROYED) {
                // continuar con la ejecución de la siguiente iteración
                continue
            }

            // Indicar en que punto del eje X hay que hacer un recorte de la imagen
            // Multiplicar el valor de la clave "color" del objeto "currentBrick" por 32 para obtener un color aleatorio en cad auno de los 
            // bricks
            // se multiplica por 32 ya que el ancho del ladrillo es de 32px
            const cutPointX = currentBrick.color * 32
            // Dibujar la imagen de los bricks
            ctx.drawImage(
                bricks, // sprite con todas las imágenes de los bricks
                cutPointX, // Recorte de cada brick de la imagen
                0, // punto incial del eje Y desde el que se recorta la imagen (arriba del todo)
                31, // ancho de cada ladrillo de la imagen 
                14, // alto de cada ladrillo de la imagen
                currentBrick.x, // posición de cada brick en el eje X
                currentBrick.y, // posición de cada brick en el eje Y
                brickWidth, // ancho de cada ladrillo en el canvas
                brickHeight // alto de cada ladrillo en el canvas
            )

        }        
    }        
}

function collisionDetection () {
    // Revisar todas las filas y columnas de los bricks del juego
    for (let column = 0; column < bricksColumnCount; column++) {        
        for (let row = 0; row < bricksRowCount; row++) {
            // Recuperar el brick actual de la revisión de todos los bricks
            const currentBrick = numBricks[column][row]
            // Si el estado del brick actual es "DESTROYED", es decir, está destruido, no hacer nada y continuar a la siguiente iteración
            if (currentBrick.status === BRICK_STATUS.DESTROYED) continue

            // Recuperar la coordenada X cuando la pelota y el ladrillo estén en la misma posición en el eje X
            const isBallPosXSameAsBrick = posX > currentBrick.x && posX < currentBrick.x + brickWidth
            // Recuperar la coordenada Y cuando la pelota y el ladrillo estén en la misma posición en el eje Y
            const isBallPosYSameAsBrick = posY > currentBrick.y && posY < currentBrick.y + brickHeight

            // Si la pelota y el ladrillo tienen la misma coordenada en los ejes X e Y
            if (isBallPosXSameAsBrick && isBallPosYSameAsBrick) {
                // Cambiar la dirección de la pelota en el eje Y para que vaya en vez de hacia arriba, hacia abajo
                // para simular que ha golpeado el brick
                directionY = -directionY

                // Cambiar el estado del brick actual a "DESTROYED" para que el brick que se ha golpeado (el brick actual) desaparezca
                currentBrick.status = BRICK_STATUS.DESTROYED
            }
        }
    }
}    

function ballMovement () { 
    // Hacer que la pelota pueda colisionar en las paredes de los laterales del canvas
    // Si la posición en el eje X más la dirección de la pelota es mayor al ancho del canvas, esta rebotará en la pared derecha
    // o la posición de la pelota más la dirección a la que va es menor al radio de la pelota, esta rebotará en la pared izquierda
    if (posX + directionX > canvas.width - ballRadius || posX + directionX < ballRadius) {
        // Cambiar el valor de la dirección del eje X de positivo a negativo o viceversa para crear así el efecto de colisión
        directionX = -directionX
    }

    // Hacer que la pelota pueda colisionar en la pared de arriba
    // Si la posición de la pelota en el eje Y más la dirección a la que va es menor al radio de la pelota (que es 0, es decir, la parte más alta del eje Y (la pared superior))
    // Se pone "ballRadius" en vez de 0 ya que si la pelota es más grande puede provocar que los bordes de la misma sobrepasen la pared superior
    if (posY + directionY < ballRadius) {
        // Cambiar el valor de la dirección del eje Y de positivo a negativo o viceversa para crear así el efecto de colisión
        directionY = -directionY
    // Saber cuando finaliza la partida (si la pelota toca el suelo)
    // Si la posición de la pelota en el eje Y más su dirección es mayor a la altura del canvas
    } 

    // Detectar si la pelota está en la misma coordenada del eje X que la paleta
    // Comprobar si la pelota está tocando la superficie de la paleta
    // para ello, la posición de la pelota en el eje X tiene que ser mayor a la posición inicial de la paleta en ese mismo eje (el borde 
    // izquierdo de la paleta)
    // y además, la posición de la pelota tiene que ser menor que la posición inicial de la paleta en el eje X más el ancho de la misma, 
    // es decir, el borde de la derecha de la paleta
    // Si la pelota está dentro dentro de la superficie de la paleta, sería "true", sino sería "false"
    const isBallPosXSameAsPaddle = posX > paddleX && posX < paddleX + paddleWidth
    // Si la posición de la pelota más la dirección de la misma en el eje Y es mayor que la posición inicial de la paleta en el eje Y,
    // significa que la pelota está tocando la paleta
    const isBallTouchingPaddle = posY + directionY > paddleY
    // Si las coordenadas de la pelota y la paleta coinciden en el eje X y la pelota está tocando la paleta
    if (isBallPosXSameAsPaddle && isBallTouchingPaddle) {
        // Cambiar la dirección de la pelota en el eje Y para que en vez de ir para abajo vaya para arriba
        directionY = -directionY
    } else if(posY + directionY > canvas.height - ballRadius) {
        // Mostrar por consola que la partida ha finalizado
        console.log('GAME OVER')
        // Recaragar la ventana cuando termina la partida
        window.location.reload()
    }
    

    // Hacer que la pelota se mueva
    // Incrementamos la posición en el eje X de la pelota con el valor de la dirección en el eje X para hacer el efecto de movimeinto
    posX += directionX
    // Incrementamos la posición en el eje Y de la pelota con el valor de la dirección en el eje Y para hacer el efecto de movimeinto
    posY += directionY
}

function paddleMovement () { 
    // Miestras se esté presionando la flecha derecha, la dirección de la paleta sea menor que el ancho del canvas menos la longitud de la paleta
    // se pone el "- paddleWidth" para que no se sobrepase la anchura de la pala y así no permitir que esta desaparezca
    if(rightPressed && paddleX < canvas.width - paddleWidth) {
        // Cambiar la dirección de la paleta para que vaya hacia la derecha (más valor, más rápido se moverá la paleta)
        paddleX += PADDLE_SENSITIVITY
    // Si por el contrario, se está presionando la flecha izquierda y el valor de la dirección del eje X es mayor que 0 (para que si toca la pared izquierda deje de moverse)
    } else if(leftPressed && paddleX > 0) {
        // Mover la paleta hacia la izquierda (más valor, más rápido se moverá la paleta)
        paddleX -= PADDLE_SENSITIVITY
    }

}

function cleanCanvas () {
    // Limpiar todos los dibujos que hayan en todo el canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
}

function initialEvents () {
    // Escuchar el evento que se encarga de ejecutar una función cuando el usuario presiona una tecla
    document.addEventListener('keydown', keyDownHandler)
    // Escuchar el evento que se encarga de ejecutar una función cuando el usuario suelta la tecla que ha presionado
    document.addEventListener('keyup', keyUpHandler)
}

function keyDownHandler (event) {
    // Recuperar la tecla del evento
    const { key } = event
    
    // Si la tecla presionada por el usuario es la flecha derecha (en algunos navegadores se llama "Right" y en otros "ArrowRight")
    if(key === 'Right' || key === 'ArrowRight') {
        // Cambiar el valor de la variable "rightPressed" a true
        rightPressed = true
        // Si por el contrario, la tecla presionada por el usuario es la flecha izquierda (en algunos navegadores se llama "Left" y en otros "ArrowLeft")
    } else if(key === 'Left' || key === 'ArrowLeft') {
        // Cambiar el valor de la variable "leftPressed" a true
        leftPressed = true
    }
}

function keyUpHandler (event) {
    const { key } = event

    // Si se deja de presionar la tecla de la flecha derecha (en algunos navegadores se llama "Right" y en otros "ArrowRight")
    if(key === 'Right' || key === 'ArrowRight') {
        // Cambiar el valor de la variable "rightPressed" a false ya que se ha dejado de presionar la tecla
        rightPressed = false
        // Si por el contrario, se deja de presionar la tecla de la flecha izquierda (en algunos navegadores se llama "Left" y en otros "ArrowLeft")
    } else if(key === 'Left' || key === 'ArrowLeft') {
        // Cambiar el valor de la variable "leftPressed" a false ya que se ha dejado de presionar la tecla
        leftPressed = false
    }
}

// Función que se ejecuta en cada frame para llamar constantemente a los 
// elementos de nuestro juego
function draw () {

    // Limpiar el canvas cada vez que se llama a la función "draw" para que no se solapen los dibujos realizados en el anterior frame con los del nuevo
    cleanCanvas()
    // Llamar a las funciones que nos permiten dibujar los elementos del juego
    drawBall()
    drawPaddle()
    drawBricks()

    // LLamar a las funciones que detectan los movimientos y las colisiones
    collisionDetection()
    ballMovement()
    paddleMovement()
    // window.requestAnimationFrame: Permite ejecutar una función justo antes de que se repinte la ventana dependiendo de la tasa de refresco del monitor
    // La función "draw" se ejecutará en cada frame por segundo creando así un loop infinito
    window.requestAnimationFrame(draw)
}

// LLamar a la función "draw" para ejecutar el loop infinito de esta
draw()

// LLamar a la función "initialEvents" para que se inicialicen los eventos cuando se cargue el juego
initialEvents()