const question = document.getElementById("qusetion");
const choices = Array.from(document.getElementsByClassName("choices-test"));

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
    question: "Commonly used data types DO NOT include:",
    Choice1: "alerts",
    Choice2: "string",
    Choice3:"numbers",
    Choice4: "booleans",
    answer: 1
    },
    {
        question: "A very useful tool used during development and debugging for printiong content to the dubugger is:",
        Choice1: "conlcole.log",
        Choice2: "JavaScript",
        Choice3:"terminal/bash",
        Choice4: "for loops" ,
        answer: 1
        },
        {
            question: "Arrays in JavaScriopt can be used to store ____.",
            Choice1: "other Arrays",
            Choice2: "numbers and strings",
            Choice3:"booleans",
            Choice4: "all of the above",
            answer: 4
            },
            {
                question: "The conditions in and if / else statement is enclosed within______.",
                Choice1: "square brackets",
                Choice2: "quotes",
                Choice3:"qurly brackets",
                Choice4: "parentheses",
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
    getNewQuestions();
};

getNewQuestions = () => {
    questionCounter++;
    Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {

    })
};
startGame();