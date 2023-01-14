
//pull local storage for highscore
//create li elements for each index of array
function loadTable() {
    if (getHighScores() != undefined) {
        highScores = getHighScores();
        var hOl = document.querySelector('#highscores');
        highScores.highscores.forEach((e) => {
            var li = document.createElement('li');
            hOl.appendChild(li);
            li.textContent = " > " + `${e.initials}` + " - " + `${e.score}`;
        });
    } 
    return;
}

loadTable();

//clear highscore localstorage and delete li elements
function clearHighScores() {
    var hOl = document.querySelector('#highscores');
    highScores = getHighScores();
    highScores.highscores.forEach((e) => {
        var li = document.querySelector('li');
        li.remove();
    });
    localStorage.clear();
    return;
}

clear.addEventListener("click", clearHighScores);