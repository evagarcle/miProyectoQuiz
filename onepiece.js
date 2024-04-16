/**obtenemos la url de la api */
const ONEPIECE_URL = 'https://mocki.io/v1/12269c12-c8a3-4344-b4ef-53e780271be5'
/**nos traemos desde html a js todos los elementos a través de su ID */
const startButton = document.getElementById("start-btn")
const nextButton = document.getElementById("next-btn")
const questionsContainer = document.getElementById("question-container")
const currentQuestion = document.getElementById("question")
const answersContainer = document.getElementById("answers-container")

/**creamos las variables globales para extraer los datos de la api y tener toda la información recogida en su correspondiente variable y posteriormente poder manejar los datos más eficientemente*/
let allData = []
let questions = []
let options = []
let answer = []

/**creamos el contador que va recogiendo si vamos acertanto o fallando las preguntas + creamos el currentQuestionIndex, que nos sirve para indicarnos en qué posición del array de preguntas nos encontramos, es decir, para saber en qué pregunta nos encontramos en ese momento */
let contCorrectAnswer = 0
let currentQuestionIndex

/**creamos la función getOnePieceData para obtener los datos de la api que necesitamos */
const getOnePieceData = async()=>{
  try {
    const res = await axios.get(ONEPIECE_URL) /**guardamos la response en una constante */
    allData = res.data /**le decimos a nuestra variable global alldata que guarde la data de la response, que es, dentro de la api, donde se encuentran las preguntas y respuestas */
    for (let i = 0; i < allData.length; i++){ /**con este buble vamos rellenando nuestras variables globales: questions recoge todas las preguntas, options recoge todas las respuestas de las 10 preguntas, y answer recoge la respuesta correcta de cada una de las 10 preguntas */
      questions.push(allData[i].question)
      options.push(allData[i].options)
      answer.push(allData[i].answer)     
    }
      } catch (error) {
    console.error(error);
  }
}
getOnePieceData() /**llamamos a la función para que se ejecute al cargar la página automáticamente */



const startGame = () => {
  startButton.classList.add("hide") /**al hacer click, ocultamos el botón de start */
  currentQuestionIndex = 0 /*asignamos el valor cero a nuestra variable global currentQuestionIndex para decirle que empezaremos en la posición cero del array de preguntas*/ 
  questionsContainer.classList.remove("hide") /**hacemos que aparezca el contenedor de las preguntas (está vacío hasta que llamamos a la función showQuestion, que lo pinta con el questionsContainer.innerHTML) */
  showQuestion() /**llamamos a la función showQuestion */
}

const showQuestion = () => {
  /**este primer if es necesario para que al llegar a la última pregunta, muestre el resultado del quiz y oculte el botón de "next" ya que no hay más preguntas
   */
  if (currentQuestionIndex >= questions.length) { /**si la posición de la pregunta actual es mayor o igual a la longitud del array significará que hemos llegado a la última pregunta, por tanto... */
    questionsContainer.innerHTML = 'Tu resultado es: </br>' + contCorrectAnswer + `/${currentQuestionIndex}` /**rellenamos el contenedor con el resultado. Este último template literal es porque tenía puesto /10 pero eso no me sirve porque en este caso sabemos que son 10 preguntas pero necesitamos una variable que nos devuelva la posición de la última pregunta, sea la cantidad de preguntas que sea */
    nextButton.classList.add('hide') /**por tanto, ya que si entramos en este if significará que nos encontramos en la última pregunta y que no hay más preguntas, debemos borrar el boton de "next"  */
  } else { /**aquí entrará de la pregunta uno a la nueve */
    answersContainer.innerHTML = '' /**limpiamos el contenedor de las respuestas */
    answersContainer.classList.remove('disabled') /**le quitamos al contenedor el disabled que le añadimos más abajo cuando seleccionamos una respuesta (para que no te deje cambiar de respuesta una vez ya hayas seleccionado una) */
    currentQuestion.innerText = questions[currentQuestionIndex] /**pintamos la pregunta diciéndole que se vaya al array de questions (nuestra varibale global) y coja la pregutna correspondiente al valor actual del currentQuestionIndex */
    
    /** del mismo modo, pintamos las respuestas: */
    for (let eachOption of options[currentQuestionIndex]) { /**para cada respuesta del array de respuestas de la pregunta actual (sabemos la pregunta actual gracias al currentQuestionIndex), */
        answersContainer.innerHTML += /**pintas en el contenedor de las respuestas: */
        `<input onclick="checkAnswer(this)" type="button" value="${eachOption}">` /**con el bucle for of pintas cada respuesta dentro de un botón para poder aplicarle la función checkAnswer. aquí estamos llamando a la función. El this nos conecta directamente cada input con la propia función para que sea ejecutada */
    }
  }
}


const checkAnswer = (element) => { /**aquí definimos la función, que pintará cada botón (cada respuesta) de rojo o de verde en función de si se trata de la respuesta correcta o no */
  if (element.value === answer[currentQuestionIndex]){ /** IMPORTANTE: element es eachOption, es decir, le decimos que mire el valor de cada respuesta (eachOption) y que cuanto encuentre una que su valor coincida con el valor de "answer" (siendo answer nuestra variable global que almacena la respuesta correcta de cada pregunta), la pinte de verde. Gracias al currentQuestionIndex, nos devuelve la respuesta correcta de la pregunta actual en la que nos encontramos*/
    element.style.backgroundColor = 'green'
    contCorrectAnswer++ /**aumentamos el contador de respuestas acertadas */
  } else {
    element.style.backgroundColor = 'red'
  }

  answersContainer.classList.add('disabled') /**le añadimos el disabled para que no nos deje cambiar de respuesta una vez ya hallamos elegido una  */
  nextButton.classList.remove('hide') /**al seleccionar nuestra respuesta elegida, le quitamos el hide al botón de next para pulsarlo y que nos lleve a la siguiente pregunta */
  
  currentQuestionIndex++ /**aumentamos el currentQuestionIdez en una unidad para que ahora nos muestre la siguiente pregunta en lugar de permanecer en la misma */

}


startButton.addEventListener('click', startGame) /**al clicar el botón start, llamamos a la función startGame */
nextButton.addEventListener('click', showQuestion) /** al clicar en el botón de next, nos ejecuta la función de showQuestion. Esta función también se ejecuta cuando pulsamos el botón de start ya que el botón start llama a la fnción startGame y startGame luego dentro de sí misma llama a showQuestion */

