//store table of highscores - person and score
var highScores = {"highscores":[]};
// = [{"initials":"","score":0}];

//add entry to highscore
function addHighScore(score, initials) {
    highScores = {"highscores":[]}
    if (getHighScores() != undefined) {
        highScores = getHighScores();
        highScores.highscores.push({"initials": initials,"score": score});
    } else {
        highScores.highscores.push({"initials": initials,"score": score});
    }
    orderHighScores();
}

//reorder highscore list by score
function orderHighScores() {
    highScores.highscores.sort((a, b) => {
        return b.score - a.score;
    });
    localStorage.setItem("highscores", JSON.stringify(highScores));
}

//load highscore list
function getHighScores() {
    if (localStorage.getItem("highscores")) {
        return JSON.parse(localStorage.getItem("highscores"));
    } else {
        return;
    }
}