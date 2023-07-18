const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Commonly used data types DO NOT include:",
        choice1: "alerts",
        choice2: "string",
        choice3: "numbers",
        choice4: "booleans",
        answer: 1
    },
    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choice1: "console.log",
        choice2: "JavaScript",
        choice3: "terminal/bash",
        choice4: "for loops",
        answer: 1
    },
    {
        question: "Arrays in JavaScript can be used to store ____.",
        choice1: "other Arrays",
        choice2: "numbers and strings",
        choice3: "booleans",
        choice4: "all of the above",
        answer: 4
    },
    {
        question: "The conditions in an if/else statement are enclosed within______.",
        choice1: "square brackets",
        choice2: "quotes",
        choice3: "curly brackets",
        choice4: "parentheses",
        answer: 4
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [...questions];
    console.log(availableQuestions);
    getNewQuestion();
};

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        return window.location.assign("/end.html");
    }
    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach(choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true;
};

choices.forEach(choice => {
    choice.addEventListener("click", e => {
        if (!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];

        const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 500);
    });
});

startGame();