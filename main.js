const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");



const API_URL= 'https://quizapi.io/api/v1/questions?apiKey=fIO0fejGD9Rs7yJv9xWVyHFPpiv9AMmTm7uc4tYv&limit=10'


let allData = []
let questions = []
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
    
  }
    console.log(questions)

  startButton.addEventListener('click', startGame)

}



function startGame (e) {
  startButton.classList.add("hide");
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  showFirstQuestion()
}



function showFirstQuestion () {
    questionElement.innerText = questions[0]
    
}
