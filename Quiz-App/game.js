const question = document.querySelector('#question')
const choices = Array.from(document.getElementsByClassName('choice-text'))
const questionText = document.querySelector('#questionText')
const scoreText = document.querySelector('#score')
const progressBarFull = document.querySelector('#progressBarFull')
const loader = document.querySelector('#loader')
const game = document.querySelector('#game')

// Objeto que guarda la pregunta actual
const currentQuestion = {}
let acceptingAnwers = 0
// Guardar la puntuación del jugador
let score = 0
let questionCounter = 0
// Array para guardar las preguntas disponibles
let availableQuestions = []

// Array para guardar las preguntas
let questions = []

// Hacer fetching de datos a la API que contiene las preguntas del quiz
fetch('https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple')
    .then(res => res.json())
    .then((loadedQuestions) => {
        questions = loadedQuestions.result.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question
            }
            const answerChoices = [...loadedQuestion.incorrectAnswers]
            formattedQuestion.answer = Math.floor(Math.random() * 4) + 1
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correctAnswer)
            answerChoices.forEach((choice, index) => {
                formattedQuestion['choice' + (index + 1)] = choice
            })

            return formattedQuestion
        })

    }). catch((error) => {
        console.error(error)
    })

const startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    game.classList.remove('hidden')
    game.classList.add('hidden')
}