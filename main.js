const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");



const API_URL= 'https://quizapi.io/api/v1/questions?apiKey=fIO0fejGD9Rs7yJv9xWVyHFPpiv9AMmTm7uc4tYv&limit=10'

let allData = []

  axios  
  .get(API_URL)
  .then((res) => {
      allData = res.data
        })
        .catch((err) => console.error(err));
        
  console.log(allData)


  let currentQuestionIndex

  function startGame() {
    startButton.classList.add('hide')
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')

    
  }





  startButton.addEventListener('click', startGame)