//Should I just re-do it all myself? How would you recommend I start then?
//Should I connect to Bootstrap? Can you show me how to do it properly?
//"Cannot set properties of null (setting onClick)" ?

//Get elements
var startScreen = document.querySelector("#start");
var startBtn = document.querySelector("#start-btn");
var infoBox = document.querySelector(".info-box");
var exitBtn = document.querySelector(".quit");
var continueBtn = document.querySelector(".restart");
var quizBox = document.querySelector(".quiz-box");
//Can't find where this might be ?
var endBox = document.querySelector("#quiz-end");
var submitBtn = document.querySelector("#save-score");
var initialsText = document.querySelector("#initials");
var existing = localStorage.getItem("results");

//What is going on here ?
existing = existing ? existing.split(',') : [];

var queCount = 0;
var counter = 60;
var score = 0;

//When Continue button is clicked, hide the information ?
continueBtn.onClick = () => {
    infoBox.classList.add("hide");
    startScreen.classList.remove("hide");
};

//When start button is clicked, do what ?
startBtn.onClick = () => {
    function countdown() {
        //What does this do ?
        counter--;
            if (counter=0) {
                clearInterval(startCountdown)
                quizEnd()
            };
    var timeRem = document.querySelector("#time-rem");
    var timeTag = "<span>Time Left: " + counter + "</span>";
    timeRem.innerHTML = timeTag;
    };

    var startCountdown = setInterval(countdown,1000);
    startScreen.classList.add("hide");
    quizBox.classList.remove("hide");
    showQuestions(queCount)
};


//Get Questions and Options from Array
function showQuestions(index){
    if (queCount>=10){
        return;
    }
    const queText = document.querySelector(".que-text");
    const optionList = document.querySelector("#choices");
    let queTag = "<span>"+ questions[index].numb + ". "+ questions[index].question +"</span>";
    let optionTag = '<div class="option">'+ questions[index].options[0] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[1] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[2] + '<span></span></div>'
                    + '<div class="option">'+ questions[index].options[3] + '<span></span></div>'
    queText.innerHTML = queTag;
    optionList.innerHTML = optionTag;
    const option = optionList.querySelectorAll(".option");
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
};


//Show Next Question When Question is answered
function optionSelected(answer){
    if (queCount>=10){
        return;
    }
    let userAns = answer.textContent;
    let correctAns = questions[queCount].answer;
    if(userAns == correctAns){
        console.log("Answer is Correct");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Correct!</span></div>';
        setTimeout(nextQuestion, 500)
        score += 1

    }else{
        console.log("Answer is Wrong");
        const response = document.querySelector("#response");
        response.innerHTML = '<div id="response"><span>Wrong!</span></div>';
        setTimeout(nextQuestion, 500)
        counter -= 5
    }
}

function nextQuestion(){
    queCount++;
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
submitBtn.onclick = () => {
    let initials = initialsText.value;
    //Store Initials and Score in Local Storage
    var resultsDataObj = {
        initials: initials,
        score: score
    }
    localStorage.setItem((localStorage.length+1), JSON.stringify(resultsDataObj));
    initialsText.value = ""
    location.reload();
}
