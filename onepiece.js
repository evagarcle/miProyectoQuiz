
const ONEPIECE_URL = 'https://mocki.io/v1/12269c12-c8a3-4344-b4ef-53e780271be5'

const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionsContainer = document.getElementById("question-container")
const currentQuestion = document.getElementById("question")
const answersContainer = document.getElementById("answers-container")
const wellcomeParagrah = document.getElementById("wellcomeParagraph")


let allData = []
let questions = []
let options = []
let answer = []


let contCorrectAnswer = 0
let currentQuestionIndex


const getOnePieceData = async () => {
  try {
    const res = await axios.get(ONEPIECE_URL) 
    allData = res.data 
    for (let i = 0; i < allData.length; i++){ 
      questions.push(allData[i].question)
      options.push(allData[i].options)
      answer.push(allData[i].answer)     
    }
  } catch (error) {
    console.error(error);
  }
}

getOnePieceData() 



const startGame = () => {
  
  startButton.classList.add("hide") 
  currentQuestionIndex = 0 
  questionsContainer.classList.remove("hide") 
  showQuestion() 
}

const showQuestion = () => {
  nextButton.classList.add('hide') 
 
  if (currentQuestionIndex >= questions.length) { 
    questionsContainer.innerHTML = `<p>Tu resultado es: </p> <p class="question-tittle">${contCorrectAnswer}/${currentQuestionIndex}</p>` 
    nextButton.classList.add('hide') 
  } else { 
    answersContainer.innerHTML = '' 
    wellcomeParagrah.classList.add('hide')
    answersContainer.classList.remove('disabled') 
    currentQuestion.innerHTML = `<p class="question-tittle">PREGUNTA ${currentQuestionIndex + 1}</p>` + questions[currentQuestionIndex] 
    
   
    for (let eachOption of options[currentQuestionIndex]) { 
        answersContainer.innerHTML += 
        `<input onclick="checkAnswer(this)" type="button" value="${eachOption}" class="input">` 
    }
  }
}


const checkAnswer = (element) => { 
  if (element.value === answer[currentQuestionIndex]){ 
    element.style.backgroundColor = 'green'
    contCorrectAnswer++ 
  } else {
    element.style.backgroundColor = 'red'
  }

  answersContainer.classList.add('disabled') 
  nextButton.classList.remove('hide') 
  
  currentQuestionIndex++ 

}


startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', showQuestion) 

