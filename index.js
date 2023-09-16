const questions = [
    {
        question: "Javascript is an _______ language?",
        answers: [
            { text: "Object-Oriented", correct: true},
            { text: "Object-Based", correct: false},
            { text: "Assembly-language", correct: false},
            { text: "Middle-level", correct: false},
            
        ]
    },

    {
        question: "Which one of the following is the correct way for calling the JavaScript code ?",
        answers: [
            { text: "Preprocessor", correct: false},
            { text: "Triggering Event", correct: false},
            { text: "RMI", correct: false},
            { text: "Function/Method", correct: true},
            
        ]
    },

    {
        question: "Which of the following givenfunctions of the Number Object formats a number with a different number of digits to the right of the decimal?",
        answers: [
            { text: "toExponential()", correct: false},
            { text: "toFixed()", correct: true},
            { text: "toPrecision()", correct: false},
            { text: "toLocaleString()", correct: false},
            
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
let currentQuestionsIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionsIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionsIndex];
    let questionNo = currentQuestionsIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;
    
    
    currentQuestion.answers.forEach(answer =>{
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if(answer.correct){
        button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);


    });
}
function  resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild)
    {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selecteBtn = e.target;
    const isCorrect = selecteBtn.dataset.correct === "true";
    if(isCorrect){
        selecteBtn.classList.add("correct");
        score++;

    }else{
        selecteBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button =>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionsIndex++;
    if(currentQuestionsIndex <questions.length){
        showQuestion();
    }else{
        showScore();
    }

}

nextButton.addEventListener("click", ()=>{
   if(currentQuestionsIndex < questions.length){
    handleNextButton();
   }else{
    startQuiz();
   }
}); 


startQuiz();