// this var creates stores the questions answers and choices in an array
var questionsArray= [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["alerts","string","numbers","booleans"],
        answer:"alerts",
    },
    {
        title: "A very useful tool used during development and debugging for printing content to the debugger is:",
        choices: ["console.log","JavaScript","terminal/bash","for loops"],
        answer:"console.log",
    },
    {
        title: "Arrays in JavaScript can be used to store ____.",
        choices: ["other Arrays","numbers and strings","booleans","all of the above"],
        answer:"all of the above",
    },
    {
        title: "The conditions in an if/else statement are enclosed within______.",
        choices: ["square brackets","quotes","curly brackets","parentheses"],
        answer:"parentheses",
    },
    {
        title: "When was coding invented",
        choices: ["1883","1917","1956","1993"],
        answer:"1883",
    }]
    // vars to pull items from document
    var startBtn = document.getElementById("startBtn")
    var timerEl = document.querySelector(".timer")
    var questionAnswers = document.getElementById('questionAnswers')
    var feedback = document.getElementById("feedback")
    // sets the score, and starts the question at 0
    var score = 0
    var questionNumber= 0
    var scoreDisplay = document.getElementById('score')
    scoreDisplay.textContent = `Score: ${score}/5`;
    for (let i = 0; i<questionsArray.length;i++){
        var currentQuestion = questionsArray[i]
    }
    // fuction for start button to start the quiz
    function startQuiz(){
        startBtn.disabled= true
        document.getElementById("start-screen").style.display= "none" 
        document.getElementById("questionAnchor").style.display = "contents"
        document.getElementById("score").style.display = "contents"
        document.getElementById("timer").style.display = "contents"
        timerCount= 60;
        startTimer()  
        getQuestions()
    }
    // pulls question onto screen
    function getQuestions(){
        var currentQuestion = questionsArray[questionNumber]
        var questionTitle = document.getElementById('questionTitle')       
        document.getElementById("questionAnchor").style.display = "flex"      
        questionTitle.textContent = currentQuestion.title      
        for(var i=0; i < currentQuestion.choices.length; i++){
            var choice = currentQuestion.choices[i];
            var choicebtn= document.createElement('button')
            
            choicebtn.setAttribute('class','answerBtns')
            choicebtn.setAttribute('value', choice)
            choicebtn.textContent= choice
            questionAnswers.appendChild(choicebtn)
        }
    }
    // When an answer button is clicked, it triggers this function
    function answerClick(event){
     var answerBtn = event.target
     document.getElementById("feedbackDiv").style.display="contents"
     if (answerBtn.value !== questionsArray[questionNumber].answer){
            timerCount -= 15
            feedback.textContent="Wrong!"
            answerBtn.disabled = true
            // if timer hits zero, quiz ends
            if (timerCount < 0){
                timerCount = 0
                endQuiz()
            }
        } 
        if (answerBtn.value === questionsArray[questionNumber].answer) {  
            feedback.textContent = "Correct!"
            score++
            }
        scoreDisplay.textContent = `Score: ${score}/5`;
        questionAnswers.innerHTML= ''
        questionNumber++
        if (questionNumber === questionsArray.length){
             winQuiz()
            //  if you reach the end of the quiz, the winQuiz funtion is triggered
        } else{
            getQuestions()
            // if not, pulls the next question
        }
    }
    
    function startTimer(){
        timer = setInterval(function(){
            timerCount--;
            timerEl.textContent = timerCount + ' seconds left!'
          if(timerCount < 1){
            endQuiz();
            }
        }, 1000)
        
    }
    
    function endQuiz(){
        clearInterval(timer)
        timerEl.textContent = "Time's up :("
        document.getElementById("questionAnchor").style.display = "none"
        feedback.textContent= "Better luck next time"

        scoreDisplay.textContent = `Score: ${score}/5`
        saveScore()
    }
    // function that triggers when you complete the quiz
    function winQuiz(){
        clearInterval(timer)

        timerEl.textContent = "You did it!"
        document.getElementById("questionAnchor").style.display = "none"
        feedback.textContent= "Congrats"
        scoreDisplay.textContent = `Score: ${score}/5`
        saveScore()
    } 
    
    function saveScore(){
        // saves score to local storage into an array, and displays them on screen
        var highscores = JSON.parse(localStorage.getItem('highscores')) || [];
        var newHighscore = {
        initials: prompt('Enter your initials:'),
        score: score
        };
        highscores.push(newHighscore);
        localStorage.setItem('highscores', JSON.stringify(highscores));
        displayHighScores()
        startBtn.disabled= false
        document.getElementById("reset").removeAttribute("class", "hidden")
    }
    
    
    
    // highscore list
    function displayHighScores() {
        var highScores = JSON.parse(localStorage.getItem('highscores')) || [];
        var highScoreList = document.getElementById("highscoreList");
        highScoreList.innerHTML = "<h1>Highscores</h1>";

        if (highScores.length === 0) {
          highScoreList.innerHTML += "<p>No high scores yet</p>";
        } else {

          highScores.forEach(function(score) {
              highScoreList.innerHTML += "<p>" + score.initials + ": " + score.score +"/5" + "</p>";
          });
        }
        // displays highscores
        highScoreList.style.display = "block";
      }
    document.getElementById("seeHS").addEventListener("click", displayHighScores())

      var clearStorageBtn = document.getElementById("clearStorage")
      clearStorageBtn.addEventListener("click", clearLocalStorage)

      function clearLocalStorage() {
        localStorage.clear();
        location.reload()
      }
    
    // Reset btn, refreshes page
    document.getElementById("reset").addEventListener("click",function(){
        location.reload()
    })
    // event listeners to start the quiz when start button is clicked.
    startBtn.addEventListener("click",startQuiz)
    questionAnswers.onclick= answerClick
