// Obtener elemento con id "question" del DOM
const question = document.getElementById('question')
// Obtener elementos con clase "choices" del DOM
const choices = document.querySelectorAll('.choice-text')
const questionText = document.querySelector('#questionText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('.progressBarFull')
const loader = document.querySelector('.loader')
const game = document.querySelector('#game')
// Guardar pregunta actual
const currentQuestion = {}
// Inicializar las respuestas aceptadas en "false" ya que al cargar no hay
let acceptedAnswers = false
// Inicializar marcador de respuestas correctas en 0
let score = 0
// Inicializar contador de preguntas en 0
let questionsCounter = 0
// Crear array vacío para guardar las preguntas disponibles
let availableQuestions = []
// Crear array vacío para guardar las preguntas existentes
let questions = []

// Fetching de datos a la API de las preguntas
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then(loadedQuestions => {
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question
            }
        })
    })