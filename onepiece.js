const ONEPIECE_URL = 'https://mocki.io/v1/12269c12-c8a3-4344-b4ef-53e780271be5'


const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionContainerElement = document.getElementById("question-container")
const questionElement = document.getElementById("question")
const answerButtonsElement = document.getElementById("answer-buttons")
const startAgainButton = document.getElementById("reStart-btn")



let allData = []
let questions = []
let options = []
let answer = []

let contCorrectAnswer = 0
let currentQuestionIndex


axios
.get(ONEPIECE_URL)
.then((res)=> {
  startQuiz(res)
}) 
.catch((err)=> console.error(err))


function startQuiz (res) {
  allData = res.data
  
  
  for (let i = 0; i < allData.length; i++){
    questions.push(allData[i].question)
    options.push(allData[i].options)
    answer.push(allData[i].answer)

    
  }
  startButton.addEventListener('click', startGame)
}


function startGame (e) {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  showQuestion()
}

function showQuestion () {

  if (currentQuestionIndex >= questions.length) {
    questionContainerElement.innerHTML = contCorrectAnswer + '/10'
    startAgainButton.classList.remove('hide')
    nextButton.classList.add('hide')
  } else {
    
    answerButtonsElement.innerHTML = '' 
  
    answerButtonsElement.classList.remove('disabled')
  
    questionElement.innerText = questions[currentQuestionIndex]
  
    for (let eachOption of options[currentQuestionIndex]) {
        answerButtonsElement.innerHTML += 
        `<input class='resBtn' onclick="checkAnswer(this)" type="button" value="${eachOption}">`
      
    }

  }
}


function checkAnswer (element) {
  if (element.value === answer[currentQuestionIndex]){
    element.style.backgroundColor = 'green'
    contCorrectAnswer++
  } else {
    element.style.backgroundColor = 'red'
  }

  answerButtonsElement.classList.add('disabled')
  nextButton.classList.remove('hide')
  
  currentQuestionIndex++

}

function tryAgain (e) {
  e.preventDefault()

}



nextButton.addEventListener('click', showQuestion)
startAgainButton.addEventListener('click', tryAgain)
