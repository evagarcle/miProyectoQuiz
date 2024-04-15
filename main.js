const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");



const API_URL= 'https://quizapi.io/api/v1/questions?apiKey=fIO0fejGD9Rs7yJv9xWVyHFPpiv9AMmTm7uc4tYv&limit=10'


let allData = []
let questions = []
let answers = []
let correctAnswer = []

let currentQuestionIndex

axios  
.get(API_URL)
.then((res) => {
  startQuiz(res)
})
.catch((err) => console.error(err));



function startQuiz (apiResponse) {
  allData = apiResponse.data
  console.log(allData)
  
  for (let i = 0; i < allData.length ; i++){
    questions.push(allData[i].question) 
    answers.push(allData[i].answers)
    if (allData[i].correct_answer !== null){
      correctAnswer.push(allData[i].correct_answer)
    } else {
      if (allData[i].correct_answers.answer_a_correct === 'true'){
        correctAnswer.push(allData[i].answers.answer_a) /* buscar cómo iterar objetos para no tener que escribir seis if con el a b c d e f */
      }

    }
  }
    console.log(questions)
    console.log(answers)
    console.log(correctAnswer)

  startButton.addEventListener('click', startGame)

}



function startGame (e) {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  showQuestion()
}



function showQuestion () {
    questionElement.innerText = questions[currentQuestionIndex]

    let arrayAnswers = [
      answers[currentQuestionIndex].answer_a,
      answers[currentQuestionIndex].answer_b,
      answers[currentQuestionIndex].answer_c,
      answers[currentQuestionIndex].answer_d,
      answers[currentQuestionIndex].answer_e,
      answers[currentQuestionIndex].answer_f
      ]
    
    for (let eachAnswer of arrayAnswers) {
      if (eachAnswer !== null) {
        answerButtonsElement.innerHTML += 
        `<input onclick="validate(this)" type="button" value="${eachAnswer}">`
      }
    }
}


function validate (elementThis) { /* explicarme cómo funciona el this */

}
