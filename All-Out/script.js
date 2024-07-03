let game_area, data;
let myTable, contentOfTable = [], originalTable;
let patternAmount = 5, currentPattern = 1, patternNumber = currentPattern;
let steps = 0;
let seconds = 0, minutes = 0, time;
let gameStarted = false, isTutorial = false;
let backgroundMusic = new Audio("./sounds/bg_music.mp3"), clickSound = new Audio("./sounds/click_effect.mp3");
let buttonClick = new Audio("./sounds/buttonclick.wav"), hover_sound = new Audio("./sounds/hover_sound.mp3");

$(document).ready(function () {
    game_area = $("#game_area");
    data = $("#data");
    menu();
    backgroundMusic.volume = 0.2;
})

function init() {
    game();
    infos();
    buttons();
    myTable = $("#play_area");
    patternNumber = 1;
    currentPattern = patternNumber;
    loadPattern(currentPattern).then();
}

function buttons() {
    let table = document.createElement("table");
    table.setAttribute("id", "buttons")

    let picker = document.createElement("div");
    picker.setAttribute("id", "picker");

    let numberPicker = document.createElement("script");
    numberPicker.setAttribute('type', 'text/javascript');
    numberPicker.innerHTML = 'numberPicker("picker")';
    picker.appendChild(numberPicker);

    let pickertr = document.createElement("tr");
    pickertr.appendChild(picker);
    table.appendChild(pickertr)

    let reset = document.createElement("button");
    reset.innerHTML = "Restart";
    reset.setAttribute("id", "reset");
    reset.setAttribute("onclick", "resetPattern();")
    reset.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    reset.addEventListener("click", function () {
        buttonClick.play().then()
    })

    let resettr = document.createElement("tr");
    resettr.appendChild(reset);
    table.appendChild(resettr);

    let random_saved = document.createElement("button");
    random_saved.innerHTML = "Random pattern";
    random_saved.setAttribute("id", "random_saved");
    random_saved.setAttribute("onclick", "randomSaved();");
    random_saved.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    random_saved.addEventListener("click", function () {
        buttonClick.play().then()
    })

    let savedtr = document.createElement("tr");
    savedtr.appendChild(random_saved);
    table.appendChild(savedtr);

    let random_generated = document.createElement("button");
    random_generated.innerHTML = "Generate";
    random_generated.setAttribute("id", "random_generated");
    random_generated.setAttribute("onclick", "randomGenerated();")
    random_generated.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    random_generated.addEventListener("click", function () {
        buttonClick.play().then()
    })

    let generatedtr = document.createElement("tr");
    generatedtr.appendChild(random_generated);
    table.appendChild(generatedtr);

    let solver = document.createElement("button");
    solver.setAttribute("id", "solver");
    solver.setAttribute("onclick", "solver();");
    solver.innerHTML = "Solver";
    solver.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })

    let solvertr = document.createElement("tr");
    solvertr.appendChild(solver);
    table.appendChild(solvertr);

    let backToMenu = document.createElement("button");
    backToMenu.setAttribute("id", "backToMenu");
    backToMenu.setAttribute("onclick", "menu();");
    backToMenu.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    backToMenu.addEventListener("click", function () {
        buttonClick.play().then();
        resetSteps();
        resetTimer();
        document.getElementById("buttons").remove()
        document.getElementById("game").remove()
        document.getElementById("infos").remove()
    })
    backToMenu.innerHTML = "Back to the menu"
    backToMenu.style.marginTop = "5%";

    let menutr = document.createElement("tr");
    menutr.appendChild(backToMenu);
    table.appendChild(menutr);

    let muteButton = document.createElement("button");
    let img = document.createElement("img");
    img.src = "./images/unmuted.png";
    img.setAttribute("id", "img");

    muteButton.setAttribute("id", "mutebutton");
    muteButton.setAttribute("onclick", "muteMusic()");
    muteButton.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    muteButton.addEventListener("click", function () {
        buttonClick.play().then()
    })
    muteButton.appendChild(img);

    let mutetr = document.createElement("tr");
    mutetr.appendChild(muteButton);
    table.appendChild(mutetr);


    game_area.append(table);
}

function muteMusic() {
    if (backgroundMusic.paused) {
        backgroundMusic.play().then();
        let img = document.getElementById("img");
        img.src = "./images/unmuted.png";
    } else {
        backgroundMusic.pause();
        let img = document.getElementById("img");
        img.src = "./images/muted.png";
    }
    backgroundMusic.muted = !backgroundMusic.muted;
}

function infos() {
    let infos = document.createElement("div");
    infos.setAttribute("id", "infos");
    game_area.append(infos);

    let table = document.createElement("table");
    infos.appendChild(table);

    let tr = document.createElement("tr");
    tr.setAttribute("id", "data");

    let lepesek_td = document.createElement("td");
    lepesek_td.innerHTML = "Steps:"
    tr.appendChild(lepesek_td);

    let getsteps_td = document.createElement("td");
    getsteps_td.setAttribute("id", "steps");

    let getsteps = document.createElement("script");
    getsteps.innerHTML = 'getSteps()';
    getsteps_td.appendChild(getsteps);
    tr.appendChild(getsteps_td);

    let ido_td = document.createElement("td");
    ido_td.innerHTML = "Time:"
    tr.appendChild(ido_td);

    let gettime_td = document.createElement("td");
    gettime_td.setAttribute("id", "time");

    let gettime = document.createElement("script");
    gettime.innerHTML = 'getTime()';
    gettime_td.appendChild(gettime);
    tr.appendChild(gettime_td);

    table.appendChild(tr);
}

function game() {
    let game = document.createElement("div");
    game.setAttribute("id", "game");
    game_area.append(game);

    let play_area = document.createElement("table");
    play_area.setAttribute("id", "play_area")
    game.appendChild(play_area);

    backgroundMusic.muted = false;
    backgroundMusic.play().then();

}

function menu() {
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;

    let menu = document.createElement("div");
    menu.setAttribute("class", "menu");
    game_area.append(menu);

    let title = document.createElement("div");
    title.setAttribute("class", "title");
    title.innerHTML = "All-Out"
    menu.appendChild(title)

    let table = document.createElement("table");
    table.setAttribute("class", "menutable")

    let playbutton = document.createElement("button");
    playbutton.innerHTML = "Start the game";
    playbutton.setAttribute("class", "play button");
    playbutton.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    playbutton.addEventListener("click", function () {
        buttonClick.play().then();
        menu.remove();
        isTutorial = false;
        init();
    });

    let playtr = document.createElement("tr");
    playtr.setAttribute("class", "playtr menutr");
    table.appendChild(playtr);
    playtr.appendChild(playbutton);

    let tutorialbutton = document.createElement("button");
    tutorialbutton.innerHTML = "Tutorial";
    tutorialbutton.setAttribute("class", "tutorial button");
    tutorialbutton.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    tutorialbutton.addEventListener("click", function () {
        buttonClick.play().then();
        menu.remove();
        isTutorial = true;
        tutorial();
    });

    let tutorialtr = document.createElement("tr");
    tutorialtr.setAttribute("class", "tutorialtr menutr");
    table.appendChild(tutorialtr);
    tutorialtr.appendChild(tutorialbutton);

    let leaderboardbutton = document.createElement("button");
    leaderboardbutton.innerHTML = "Leaderboard";
    leaderboardbutton.setAttribute("class", "leaderboard button");
    leaderboardbutton.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    leaderboardbutton.addEventListener("click", function () {
        buttonClick.play().then();
        menu.remove();
        leaderboard();
    });

    let leadertr = document.createElement("tr");
    leadertr.setAttribute("class", "leadertr menutr");
    table.appendChild(leadertr);
    leadertr.appendChild(leaderboardbutton);

    menu.appendChild(table);
}

function leaderboard() {
    let leaderboard = document.createElement("div");
    leaderboard.setAttribute("id", "leaderboardbg");
    let board = document.createElement("table");
    board.setAttribute("id", "leaderboard");

    let desc = document.createElement("tr");
    desc.setAttribute("class", "desc");

    let name = document.createElement("td");
    name.setAttribute("class", "name tile");
    name.innerHTML = "Name:";

    let pattern = document.createElement("td");
    pattern.setAttribute("class", "patternnumber tile");
    pattern.innerHTML = "Pattern:";

    let time = document.createElement("td");
    time.setAttribute("class", "time tile");
    time.innerHTML = "Time:";

    let stepAmount = document.createElement("td");
    stepAmount.setAttribute("class", "steps tile");
    stepAmount.innerHTML = "Steps:";

    desc.appendChild(name);
    desc.appendChild(pattern);
    desc.appendChild(time);
    desc.appendChild(stepAmount);
    board.appendChild(desc);
    leaderboard.appendChild(board);
    game_area.append(leaderboard);

    if (localStorage.getItem("name")) {
        let newboard = document.createElement("table");
        newboard.setAttribute("id", "record");

        let tr = document.createElement("tr");
        tr.setAttribute("class", "new");

        let name = document.createElement("td");
        name.setAttribute("class", "name new");
        name.innerHTML = localStorage.getItem("name");
        tr.appendChild(name);

        let pattern = document.createElement("td");
        pattern.setAttribute("class", "pattern new");
        pattern.innerHTML = localStorage.getItem("pattern");
        tr.appendChild(pattern);

        let time = document.createElement("td");
        time.setAttribute("class", "time new");
        time.innerHTML = localStorage.getItem("time");
        tr.appendChild(time);

        let steps = document.createElement("td");
        steps.setAttribute("class", "steps new");
        steps.innerHTML = localStorage.getItem("steps");
        tr.appendChild(steps);

        newboard.appendChild(tr);
        leaderboard.append(newboard)
    }

    let backToMenu = document.createElement("button");
    backToMenu.setAttribute("class", "backToMenu button");
    backToMenu.setAttribute("onclick", "menu();");
    backToMenu.addEventListener("mouseenter", function () {
        hover_sound.play().then()
    })
    backToMenu.addEventListener("click", function () {
        if (localStorage.getItem("name")) {
            document.getElementById("record").remove();
        }
        document.getElementById("leaderboardbg").remove();
        buttonClick.play().then();
    })
    backToMenu.innerHTML = "Back to the menu"
    backToMenu.style.marginTop = "5%";
    leaderboard.append(backToMenu);
}

function tutorial() {
    game();
    infos();
    buttons();
    myTable = $("#play_area");
    let pattern = [
        [0, 1, 1, 1, 0],
        [1, 1, 1, 1, 1],
        [1, 0, 0, 0, 1],
        [0, 0, 1, 0, 0],
        [0, 0, 1, 0, 0]
    ]
    loadPattern(pattern).then();
    let sequence = [
        {i: 1, j: 1},
        {i: 1, j: 3},
        {i: 1, j: 2},
        {i: 2, j: 1},
        {i: 2, j: 3},
        {i: 3, j: 2}
    ];

    function createTile(index) {
        if (index >= sequence.length) {
            myTable.empty();
            contentOfTable = [];
            let play_area = document.getElementById("play_area");
            let tutorialComplete = document.createElement("div");
            tutorialComplete.innerHTML = 'Successfully completed the tutorial<br>👈(ﾟヮﾟ👈)<br>Enjoy the rest of the game with the knowledge now';
            tutorialComplete.setAttribute("class", "tutorialComplete");
            play_area.append(tutorialComplete);

            let backToMenu = document.createElement("button");
            backToMenu.setAttribute("class", "backToMenu button");
            backToMenu.setAttribute("onclick", "menu();");
            backToMenu.addEventListener("mouseenter", function () {
                hover_sound.play().then()
            });
            backToMenu.addEventListener("click", function () {
                resetSteps();
                document.getElementById("buttons").remove();
                document.getElementById("game").remove();
                document.getElementById("infos").remove();
                buttonClick.play().then();
            })
            backToMenu.innerHTML = "Back to the menu"
            backToMenu.style.marginTop = "5%";
            play_area.appendChild(backToMenu);

            let startGame = document.createElement("button");
            startGame.setAttribute("class", "start button");
            startGame.addEventListener("mouseenter", function () {
                hover_sound.play().then()
            });
            startGame.addEventListener("click", function () {
                resetSteps();
                document.getElementById("buttons").remove()
                document.getElementById("game").remove()
                document.getElementById("infos").remove()
                isTutorial = false;
                buttonClick.play().then();
            })
            startGame.setAttribute("onclick", "init();");
            startGame.innerHTML = "Start the game";
            startGame.style.marginTop = "5%";
            startGame.style.float = "right";
            play_area.appendChild(startGame);
            return;
        }

        let {i, j} = sequence[index];
        let tile = contentOfTable[i][j];
        tile.style.borderColor = "lime";
        tile.addEventListener("click", function func(event) {
            selectTile(i, j);
            tile.style.borderColor = "";
            tile.removeEventListener("click", func);
            createTile(index + 1);
        });
    }

    function createPopup(message) {
        let popup = document.createElement("div");
        popup.setAttribute("id", "popup");

        let popupContent = document.createElement("div");
        popupContent.innerHTML = message;

        let nextButton = document.createElement("button");
        nextButton.innerHTML = "Next";
        nextButton.setAttribute("class", "nextButton button");
        nextButton.addEventListener("click", function () {
            document.body.removeChild(popup);
        });
        popupContent.appendChild(nextButton);
        popup.appendChild(popupContent);

        popup.style.position = "fixed";
        popup.style.top = "40%";
        popup.style.left = "55%";
        popup.style.transform = "translate(-50%, -50%)";
        popup.style.backgroundColor = "orange";
        popup.style.width = "50%";
        popup.style.height = "55%";
        popup.style.padding = "10px";
        popup.style.border = "1px solid #ccc";
        nextButton.style.marginTop = "30px";

        document.body.appendChild(popup);
    }

    let desc = "<mark>Rules:<br></mark>" +
        "&nbsp; <b>Starting Up:</b><li>The game begins with a grid of lights that are either on or off.<br>" +
        "&nbsp; <b>Clicking:</b><li>A player clicks on a single light, which toggles the state of that light and all its immediate neighbors. " +
        "Neighbors are horizontally and vertically adjacent lights surrounding the clicked light.<br>" +
        "&nbsp; <b>Goal:</b><li>The goal is to turn off all the lights.<br>" +
        "&nbsp; <b>Winning:</b><li>The player wins by successfully turning off all the lights.<br>" +
        "<mark>Tips:</mark>" +
        "<br>&emsp;Prioritize clicking lights that affect multiple neighboring lights." +
        "<br>&emsp;Keep track of your clicks to avoid repeating the same sequence of moves." +
        "<br>&emsp;Don't be afraid to experiment and try different strategies." +
        "<br> <strong>Let's try it out. The green frame around the blocks shows a possible solution.</strong>"

    createPopup(desc);
    createTile(0);
}

function selectTile(x, y) {
    if (validPosition(x, y)) {
        contentOfTable[x][y].className = changeStatus(contentOfTable[x][y].className)

        clickSound.play().then();
        clickSound.volume = 1;

        if (validPosition(x + 1, y)) {
            contentOfTable[x + 1][y].className = changeStatus(contentOfTable[x + 1][y].className)
        }
        if (validPosition(x - 1, y)) {
            contentOfTable[x - 1][y].className = changeStatus(contentOfTable[x - 1][y].className)
        }
        if (validPosition(x, y + 1)) {
            contentOfTable[x][y + 1].className = changeStatus(contentOfTable[x][y + 1].className)
        }
        if (validPosition(x, y - 1)) {
            contentOfTable[x][y - 1].className = changeStatus(contentOfTable[x][y - 1].className)
        }
    }
    steps++;
    getSteps();
    if (checkWin()) {
        Win();
    }
}

function validPosition(x, y) {
    return x >= 0 && x < contentOfTable.length && y >= 0 && y < contentOfTable[0].length;
}

function changeStatus(status) {
    switch (status) {
        case "lighted_out":
            return "lit_up";
        case "lit_up":
            return "lighted_out";
    }
}

function clickHandler(event) {
    if (!gameStarted) {
        gameStarted = true;
        time = setInterval(timesPass, 1000);
    }
    let selectedElement = event.target;
    let rowIndex = selectedElement.parentNode.rowIndex;
    let cellIndex = selectedElement.cellIndex;

    selectTile(rowIndex, cellIndex);
}

async function loadPattern(id) {
    contentOfTable = [];
    myTable.empty();
    let pattern;
    if (id instanceof Array) {
        pattern = id;
    } else {
        pattern = await getPattern(id);
    }

    for (let i = 0; i < pattern.length; i++) {
        let tr = document.createElement("tr");
        contentOfTable[i] = [];
        for (let j = 0; j < pattern[0].length; j++) {
            let td = document.createElement("td");
            td.setAttribute("class", selectStatus(pattern[i][j]));
            td.setAttribute("id", "pattern")
            if (!isTutorial)
                td.setAttribute("onclick", "clickHandler(event)");
            tr.append(td);
            contentOfTable[i][j] = td;
        }
        myTable.append(tr);
    }
    originalTable = myTable;
}

async function getPattern(id) {
    if (Number.isInteger(id)) {
        currentPattern = id;
        patternNumber = currentPattern;
        updateNumberText("picker");
    }

    const response = await fetch('./patterns.json');
    const obj = await response.json();
    const item = obj.find(item => item[id]);

    return item[id].pattern;
}

function selectStatus(number) {
    switch (number) {
        case 0:
            return "lighted_out";
        case 1:
            return "lit_up";
    }
}

function checkWin() {
    for (let i = 0; i < contentOfTable.length; i++) {
        for (let j = 0; j < contentOfTable[0].length; j++) {
            if (contentOfTable[i][j].className === "lit_up") {
                return false;
            }
        }
    }
    return true;
}

function Win() {
    myTable.empty();
    clearInterval(time);
    myTable.append('<tr> <td>' +
        '<div id="name_text">Your name: </div>' +
        '<input type="text" id="name" required/>' +
        '<input type="button" value="Add to leaderboard" id="name button" onclick="addToLeaderboard();"/>' +
        '</td> </tr>');
    gameStarted = false;
}

function addToLeaderboard() {
    let input = document.getElementById("name");

    if (input.value.trim().length > 0) {
        localStorage.setItem('name', input.value);
        localStorage.setItem('pattern', currentPattern);
        localStorage.setItem('time', ((minutes.toString().length === 1 ? (("0" + minutes.toString())) : minutes.toString())) + ":" + (seconds.toString().length === 1 ? ("0" + seconds.toString()) : seconds.toString()));
        localStorage.setItem('steps', steps);

        myTable.append('<div>Successfully added to the leaderboard</div>')

        let backToMenu = document.createElement("button");
        backToMenu.setAttribute("class", "backToMenu button");
        backToMenu.setAttribute("onclick", "menu();")
        backToMenu.addEventListener("click", function () {
            resetSteps();
            document.getElementById("buttons").remove()
            document.getElementById("game").remove()
            document.getElementById("infos").remove()
        })
        backToMenu.innerHTML = "Back to the menu"
        backToMenu.style.marginTop = "5%";
        document.getElementById("play_area").appendChild(backToMenu);
    }
}

function solver() {
    for (let i = 1; i < contentOfTable.length; i++) {
        for (let j = 0; j < contentOfTable[0].length; j++) {
            if (contentOfTable[i - 1][j].className === "lit_up") {
                selectTile(i,j);
            }
        }
    }
    if (!checkWin()) {
        lastRow();
        solver();
    } else {
        Win();
    }
}

function lastRow() {
    let lastRow = []
    for (let i = 0; i < contentOfTable[0].length; i++) {
        if (contentOfTable[contentOfTable.length - 1][i].className === "lit_up") {
            lastRow.push(1)
        } else {
            lastRow.push(0)
        }
    }

    if (lastRow.every((ertek, index) => ertek === [1, 1, 0, 1, 1][index])) {
        selectTile(0,2);
    } else if (lastRow.every((ertek, index) => ertek === [0, 0, 1, 1, 1][index])) {
        selectTile(0,3);
    } else if (lastRow.every((ertek, index) => ertek === [0, 1, 0, 1, 0][index])) {
        selectTile(0,1);
        selectTile(0,4);
    } else if (lastRow.every((ertek, index) => ertek === [0, 1, 1, 0, 1][index])) {
        selectTile(0,0);
    } else if (lastRow.every((ertek, index) => ertek === [1, 0, 0, 0, 1][index])) {
       selectTile(0,3);
       selectTile(0,4);
    } else if (lastRow.every((ertek, index) => ertek === [1, 0, 1, 1, 0][index])) {
        selectTile(0,4);
    } else if (lastRow.every((ertek, index) => ertek === [1, 1, 1, 0, 0][index])) {
        selectTile(0,1);
    }
}

function timesPass() {
    if (seconds >= 60) {
        minutes++;
        seconds = 0;
    }

    getTime()
    seconds++;

}

function getSteps() {
    document.getElementById("steps").innerHTML = steps.toString();
}

function getTime() {
    document.getElementById("time").innerHTML = ((minutes.toString().length === 1 ? (("0" + minutes.toString())) : minutes.toString())) + ":" + (seconds.toString().length === 1 ? ("0" + seconds.toString()) : seconds.toString());
}

function resetPattern() {
    if (!isTutorial) {
        myTable.empty();
        myTable = originalTable;
        resetEverything();
        loadPattern(patternNumber).then();
    }
}

function randomSaved() {
    if (!isTutorial) {
        resetEverything();
        let randomNumber = Math.floor((Math.random() * patternAmount) + 1);
        if (randomNumber !== patternNumber) {
            loadPattern(randomNumber).then();
        } else {
            randomSaved();
        }
    }
}

function randomGenerated() {
    if (!isTutorial) {
        let pattern = [];
        for (let i = 0; i < 5; i++) {
            pattern[i] = [];
            for (let j = 0; j < 5; j++) {
                pattern[i][j] = Math.round(Math.random());
            }
        }
        resetEverything();
        currentPattern = "generated";
        loadPattern(pattern).then();
    }
}

function resetSteps() {
    steps = 0;
    getSteps();
}

function resetEverything() {
    resetTimer();
    resetSteps();
    gameStarted = false;
}

function resetTimer() {
    seconds = 0;
    minutes = 0;
    clearInterval(time)
    getTime();
}

function numberPicker($id) {
    const numberpkr = document.createElement('div');

    const plusDiv = document.createElement('div');
    const minusDiv = document.createElement('div');
    const firstDiv = document.createElement('div');
    const lastDiv = document.createElement('div');
    const numberText = document.createElement('div');

    let div = document.getElementById($id);

    numberpkr.className = "numberpkr";

    plusDiv.className = "plusname plusminus";
    plusDiv.innerHTML = "+";
    if (!isTutorial)
        plusDiv.onclick = function () {
            pkrclicked($id, "+");
        };

    minusDiv.className = "minusname plusminus";
    minusDiv.innerHTML = "-";
    if (!isTutorial)
        minusDiv.onclick = function () {
            pkrclicked($id, "-");
        };

    firstDiv.className = "firstname plusminus";
    firstDiv.innerHTML = "<<";
    if (!isTutorial)
        firstDiv.onclick = function () {
            pkrclicked($id, "<<");
        };

    lastDiv.className = "lastname plusminus";
    lastDiv.innerHTML = ">>";
    if (!isTutorial)
        lastDiv.onclick = function () {
            pkrclicked($id, ">>");
        };

    numberText.className = "numbertext";
    numberText.innerHTML = patternNumber;
    numberText.id = $id + "_1";

    numberpkr.appendChild(minusDiv);
    numberpkr.appendChild(plusDiv);
    numberpkr.appendChild(firstDiv);
    numberpkr.appendChild(lastDiv);
    numberpkr.appendChild(numberText);

    div.appendChild(numberpkr);
}

function pkrclicked($id, $d) {
    if (typeof currentPattern !== "number") {
        currentPattern = patternNumber
    }
    switch ($d) {
        case "+":
            if (currentPattern < patternAmount) {
                currentPattern++;
                patternNumber++;
                updateNumberText($id);
            }
            break;

        case "-":
            if (currentPattern > 1) {
                currentPattern--;
                patternNumber--;
                updateNumberText($id);
            }
            break;

        case "<<":
            currentPattern = 1;
            patternNumber = 1;
            updateNumberText($id);
            break;

        case ">>":
            currentPattern = patternAmount;
            patternNumber = patternAmount;
            updateNumberText($id);
            break;
    }
    resetPattern();
}

function updateNumberText($id) {
    let numberText = document.getElementById($id + "_1");
    numberText.innerHTML = currentPattern;
}
