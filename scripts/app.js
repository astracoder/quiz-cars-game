import myQuestions from "./myQuestions.js";

let questionAmount = document.querySelector('.questionAmount');
let numberQuestion = document.querySelector('.numberQuestion');
let nameQuestion = document.querySelector('.nameQuestion');
let answers = document.querySelector('.answers');
let contentQuiz = document.querySelector('.contentQuiz');
let textResult = document.querySelector('.textResult');
let textPoints = document.querySelector('.textPoints');
let resultQuiz = document.querySelector('.resultQuiz');
let btnRestart = document.querySelector('.btnRestart');

let currentIndex =  0;
let hits = 0;
let points = 0;

function nextQuestion(e) {
    const selectedButton = e.target;
    if(selectedButton.getAttribute('data-correct') === "true") {
        selectedButton.classList.add('correctAnswer');
        hits++;
        points += 10;
    } else {
        selectedButton.classList.add('incorrectAnswer');
    }

    document.querySelectorAll('.answer').forEach((item) => {
        item.removeEventListener('click', nextQuestion);
    }) 

    setTimeout(() => {
        if(currentIndex < myQuestions.length - 1) {
            currentIndex++;
            startQuestion();
        } else {
            finishGame();
        }
    }, 1000) 
}

function finishGame() {
    textResult.innerHTML = `Você acertou ${hits} de ${myQuestions.length} questões!`;
    textPoints.innerHTML = `Você conquistou ${points} pontos!`;
    contentQuiz.style.display = "none";
    resultQuiz.style.display = "flex";

    btnRestart.addEventListener('click', restartGame);
}

function startQuestion() {
    questionAmount.innerHTML = `${currentIndex + 1} / ${myQuestions.length}`;
    const soloQuestion = myQuestions[currentIndex];
    answers.innerHTML = "";
    numberQuestion.innerHTML = `Questão`;
    nameQuestion.innerHTML = soloQuestion.question;

    soloQuestion.answers.forEach((answer => {
        const div = document.createElement('div');

        div.innerHTML = 
        `
        <button class="answer" data-correct="${answer.isCorrect}">
            ${answer.op}
        </button>
        `

        answers.appendChild(div);
    }));

    document.querySelectorAll('.answer').forEach((item) => {
        item.addEventListener('click', nextQuestion);
    });
}

function restartGame() {
    contentQuiz.style.display = "flex";
    resultQuiz.style.display = "none";
    currentIndex = 0;
    hits = 0;
    points = 0;
    startQuestion();
}

startQuestion();