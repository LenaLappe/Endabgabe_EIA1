window.addEventListener("load", function () {
    //variablen deklarieren
    var levelButtons = document.querySelector(".levelButtons");
    var mediumButton = document.getElementById("mediumButton");
    var containerMedium = document.querySelector(".containerMedium");
    var textBox = document.querySelector(".textBox");
    var comOrPlayerButton = document.querySelector(".comOrPlayerButton");
    var playerButton = document.querySelector(".playerButton");
    var comButton = document.querySelector(".comButton");
    var restartButton = document.querySelector(".textBox");
    var roundCounter = document.querySelector("#roundCounter");
    var player1Score = document.getElementById("Player1Score");
    var player2Score = document.getElementById("Player2Score");
    var p1Score = 0;
    var p2Score = 0;
    var easy = 4;
    var medium = 5;
    var hard = 6;
    var countsEveryRound = 1;
    var roundWon = false;
    var currentPlayerIsPlayer0 = true;
    var comVariable = false;
    var board = 8;
    var gameboard;
    var mediumArray = [{ symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }];
    mediumButton.addEventListener("click", comOrPlayerHandler);
    function comOrPlayerHandler() {
        //alle Buttons verschwinden lassen und HTML einmal grundleeren
        levelButtons.innerHTML = "";
        //endBox leeren, sonst wird bei drücken des restart Buttons auch die Gewinnernachricht übernommen
        textBox.innerHTML = "";
        // alles auf Null setzen, damit es beim restart auch wirklich bei Null wieder anfängt
        player1Score.innerHTML = "";
        player2Score.innerHTML = "";
        countsEveryRound = 1;
        p1Score = 0;
        p2Score = 0;
        // buttons für Player vs Player oder Player vs Com generieren
        // nach click auf einen Button wird das Spielfeld generiert
        comButton = document.createElement("button");
        comButton.classList.add("comButton");
        comButton.innerHTML = "Player vs Com";
        comButton.addEventListener("click", function () {
            comVariable = true;
            drawField();
        });
        comOrPlayerButton.appendChild(comButton);
        playerButton = document.createElement("button");
        playerButton.classList.add("playerButton");
        playerButton.innerHTML = "Player vs Player";
        playerButton.addEventListener("click", drawField);
        comOrPlayerButton.appendChild(playerButton);
    }
    function drawField() {
        // div mit comOrPlayerButtons leeren
        comOrPlayerButton.innerHTML = "";
        //nach jedem durchlauf Container leeren, sonst generieren sich immer neue 9 divs
        containerMedium.innerHTML = "";
        var _loop_1 = function (i) {
            gameboard = document.createElement("div");
            gameboard.classList.add("field");
            var idField = document.createAttribute("id");
            idField.value = i.toString();
            containerMedium.appendChild(gameboard);
            gameboard.setAttributeNode(idField);
            console.log(i);
            roundCounter.innerHTML = "Round " + countsEveryRound + " of 3";
            player1Score.innerHTML = "Player 1: " + p1Score;
            player2Score.innerHTML = "Player 2: " + p2Score;
            //Felder werden mit ensprechenden icons gefüllt
            //Spieler1 = x
            if (mediumArray[i].symbol == "x") {
                var turn = document.createElement("i");
                turn.classList.add("fas", "fas", "fa-times");
                // turn.style.color = "white";
                // console.log("Kreuz");
                gameboard.appendChild(turn);
            }
            //Spieler2 = o
            else if (mediumArray[i].symbol == "o") {
                var otherTurn = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                // otherTurn.style.color = "white";
                // console.log("Kreis");
                gameboard.appendChild(otherTurn);
            }
            //überwachung der freien Felder, ob gedrückt wurde
            else if (mediumArray[i].symbol == "free") {
                // console.log("i is " + i);
                gameboard.addEventListener("click", function () { clickFunction(i); });
            }
        };
        //leichtes Spielfeld mit 9 divs erstellen
        for (var i = 0; i <= board; i++) {
            _loop_1(i);
        }
    }
    function comHandler() {
        console.log("comHandler ");
        setTimeout(function () {
            while (true) {
                var randomNumber = Math.floor(Math.random() * mediumArray.length);
                if (mediumArray[randomNumber].symbol === "free") {
                    mediumArray[randomNumber].symbol = "o";
                    break;
                }
            }
            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
            drawField();
            handleWinningResults();
            console.log("random number is " + randomNumber);
            console.log("comHandler fired");
        }, 300);
    }
    function clickFunction(positionImArray) {
        // console.log("position is " + positionImArray);
        // for (let index: number  = 0; index <= board; index++) {
        // if (positionImArray == index) {
        if (currentPlayerIsPlayer0 === true) {
            mediumArray[positionImArray].symbol = "x";
            console.log("Kreuz gedrückt");
            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
            drawField();
            handleWinningResults();
            if (comVariable === true) {
                comHandler();
            }
        }
        else {
            mediumArray[positionImArray].symbol = "o";
            console.log("Kreis gedrückt");
            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
            drawField();
            handleWinningResults();
        }
        //  }
        // }
    }
    //gewinnen einer Runde
    var winningConditions = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4, 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];
    function handleWinningResults() {
        //durchgehen des Arrays winningCondition 
        for (var i = 0; i <= 7; i++) {
            if (mediumArray[winningConditions[i][0]].symbol != "free" || mediumArray[winningConditions[i][1]].symbol != "free" || mediumArray[winningConditions[i][2]].symbol != "free" || mediumArray[winningConditions[i][3]].symbol != "free") {
                if (mediumArray[winningConditions[i][0]].symbol == mediumArray[winningConditions[i][1]].symbol && mediumArray[winningConditions[i][1]].symbol == mediumArray[winningConditions[i][2]].symbol && mediumArray[winningConditions[i][2]].symbol == mediumArray[winningConditions[i][3]].symbol) {
                    roundWon = true;
                    console.log("Runde " + countsEveryRound);
                    console.log("won");
                }
            }
            if (roundWon == true) {
                console.log("RoundEnd function fired");
                scoreHandler();
            }
        }
        var counterFreePosition = 0;
        for (var index = 0; index < mediumArray.length; index++) {
            if (mediumArray[index].symbol == "free") {
                counterFreePosition++;
                console.log("free " + counterFreePosition);
            }
        }
        if (counterFreePosition === 0) {
            gameEnding();
        }
    }
    function scoreHandler() {
        if (currentPlayerIsPlayer0 === true) {
            p2Score++;
            console.log("player 2 score ");
        }
        else {
            p1Score++;
            console.log("player 1 score ");
        }
        gameEnding();
    }
    function gameEnding() {
        countsEveryRound++;
        for (var i = 0; i < mediumArray.length; i++) {
            mediumArray[i].symbol = "free";
            roundWon = false;
            console.log("neu zeichnen");
        }
        drawField();
        if (countsEveryRound == medium) {
            endBox();
        }
    }
    function endBox() {
        roundCounter.innerHTML = "";
        gameboard.innerHTML = "";
        containerMedium.innerHTML = "";
        comVariable = false;
        console.log("spielfeld löschen");
        if (p1Score > p2Score) {
            textBox.innerHTML = "the winner is Player 1";
        }
        else if (p2Score > p1Score) {
            textBox.innerHTML = "the winner is Player 2";
        }
        else {
            textBox.innerHTML = "it's a draw";
        }
        console.log("spielende funktionirt");
        restartButton = document.createElement("button");
        restartButton.classList.add("returnButton");
        restartButton.innerHTML = "restart";
        restartButton.addEventListener("click", comOrPlayerHandler);
        textBox.appendChild(restartButton);
    }
});
//# sourceMappingURL=typescript_medium.js.map