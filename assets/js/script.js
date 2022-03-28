//check to make sure JS was correctly connected to HTML file
console.log("We're connected!");

//Getting elements using Query Selector

//Starting screen that is initially hidden
var startScreen = document.querySelector("#start");
//Button on the start screen to initiate the game 
var startBtn = document.querySelector("#start-btn");
//The introductory information before the starting screen
var infoBox = document.querySelector(".info-box");
var exitBtn = document.querySelector(".quit");
//continue button to initiate the application and bring up the start screen
var continueBtn = document.getElementById("restart");
//HTML element where the question text will be
var quizBox = document.querySelector(".quiz-box");
//HTML elements that are hidden till the end of the quiz, and which prompts the user to enter initials
var endBox = document.querySelector("#quiz-end");
//Submit button to initiate score saving
var submitBtn = document.querySelector("#save-score");
//user-input initials used to store high score
var initialsText = document.querySelector("#initials");
var existing = localStorage.getItem("results");

//Taking the results from local storage
if (existing) {
    existing = existing.split(",");
} else {
    existing = [];
};

//Variable keeping track of the amount of questions
var queCount = 0;
//variable keeping track of user score
var score = 0;
//variable keeping track of time
let counter = 60;


//When Continue button is clicked, hide the information and prompt the introduction & start screen
continueBtn.onclick = function() {
    console.log("button is clicked");
    //is "hide" class just applicable with this bootstrap set-up?
    infoBox.classList.add("hide");
    startScreen.classList.remove("hide");
};

//When start button is clicked: start the timer, close the start screen, and initiate the question portion
startBtn.onclick = function() {
    function countdown() {
        console.log(counter);
        counter--;
        // if (counter = 0) {
        //     clearInterval(startCountdown);
        //     quizEnd();
        // };
        var timeRem = document.querySelector("#time-rem");
        var timeTag = "<span>Time Left: " + counter + "</span>";
        timeRem.innerHTML = timeTag;
    };
    
    var startCountdown = setInterval(countdown,1000);
    startScreen.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestions(queCount)
};

//Get Questions and answer options from Array
function showQuestions(index){
    if (queCount>=10){
        return;
    }
    //the text of a given question
    const queText = document.querySelector(".que-text");
    //the answer choices available for the given question
    const optionList = document.querySelector("#choices");
    //Pulls a given question and its number from the array according to the index variable being passed through the function
    let queTag = "<span>"+ questions[index].numb + ". "+ questions[index].question +"</span>";
    //Pulls the question's answer choices from the array accoring to the index variable
    let optionTag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'
    //sets the text of the question name & number HTML element to display                    
    queText.innerHTML = queTag;
    //sets the text of the answer choices HTML element display
    optionList.innerHTML = optionTag;
    //setting a local variable for each individual option element... 
    const option = optionList.querySelectorAll(".option");
    //setting the onclick attribute and the optionSelected function for the objects
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }

};


//Show Next Question When Question is answered
function optionSelected(answer){
    if (queCount>=10){
        return;
    }
    //sets user's answer to the text content of the option selected
    let userAns = answer.textContent;
    //declares the correct answer to be the answer property from the questions object
    let correctAns = questions[queCount].answer;
    //If the answer is correct, log such in the console while creating an HTML element that tells the user it was correct
    if(userAns == correctAns){
        console.log("Answer is Correct");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1
    //if the answer is incorrect, log such in the console while creating an HTML element that tells the user it was wrong
    }else{
        console.log("Answer is Wrong");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 5
    }
};

//function that continues presenting new questions as long as there have been less than 10 questions
function nextQuestion(){
    //add one to the question counter
    queCount++;

    //after the tenth question, end the quiz
    if(queCount == 10){
        
        quizEnd()
    };
    showQuestions(queCount);
    const response = document.querySelector("#response");
    response.innerHTML = '<div id="response"><span></span></div>';
    }

//End Quiz if All Questions Completed or Timer Runs out
function quizEnd(){
    quizBox.classList.add("hide");
    endBox.classList.remove("hide");
    const scoreText = document.querySelector(".score");
    let scoreTag = '<h3 class="score"> Your score was '+ score +' out of 10!</h3>';
    scoreText.innerHTML = scoreTag; 
}


//Submit Initials
submitBtn.onclick = function() {
    //get the value from the input
    var initials = initialsText.value;
    //Store Initials and Score in Local Storage
    var resultsDataObj = {
        initials: initials,
        score: score
    }
    localStorage.setItem((localStorage.length+1), JSON.stringify(resultsDataObj));
    initialsText.value = "";
    location.reload();
}
