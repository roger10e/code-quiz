var highScoresText = document.querySelector("#high-scores");
var highScoresText = "";

for (var i = 0; i< localStorage.length; i++) {
    //What is this?
    highScoreData = JSON.parse(localStorage.getItem(i+1));

    //What is this?
    highScoresTag = highScoresTag.concat("</br><div id='high-scores'>" + highScoreData.initials + " " + "-" + " " + highScoreData.score + "</div>");

}

highScoresText.innerHTML = highScoresTag;