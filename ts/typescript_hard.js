window.addEventListener("load", function () {
    //variablen deklarieren
    var levelButtons = document.querySelector(".levelButtons");
    var hardButton = document.getElementById("hardButton");
    var containerHard = document.querySelector(".containerHard");
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
    var board = 24;
    var gameboard;
    var hardArray = [{ symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }];
    hardButton.addEventListener("click", comOrPlayerHandler);
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
        comVariable = true;
        comButton.addEventListener("click", drawField);
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
        containerHard.innerHTML = "";
        var _loop_1 = function (i) {
            gameboard = document.createElement("div");
            gameboard.classList.add("field");
            var idField = document.createAttribute("id");
            idField.value = i.toString();
            containerHard.appendChild(gameboard);
            gameboard.setAttributeNode(idField);
            console.log(i);
            roundCounter.innerHTML = "Round " + countsEveryRound + " of 5";
            player1Score.innerHTML = "Player 1: " + p1Score;
            player2Score.innerHTML = "Player 2: " + p2Score;
            //Felder werden mit ensprechenden icons gefüllt
            //Spieler1 = x
            if (hardArray[i].symbol == "x") {
                var turn = document.createElement("i");
                turn.classList.add("fas", "fas", "fa-times");
                // turn.style.color = "white";
                // console.log("Kreuz");
                gameboard.appendChild(turn);
            }
            //Spieler2 = o
            else if (hardArray[i].symbol == "o") {
                var otherTurn = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                // otherTurn.style.color = "white";
                // console.log("Kreis");
                gameboard.appendChild(otherTurn);
            }
            // else if (currentPlayerIsPlayer0 == false && comVariable == true ) {
            //     comHandler();
            // }
            //überwachung der freien Felder, ob gedrückt wurde
            else if (hardArray[i].symbol == "free") {
                // console.log("i is " + i);
                gameboard.addEventListener("click", function () { clickFunction(i); });
            }
        };
        //leichtes Spielfeld mit 9 divs erstellen
        for (var i = 0; i <= board; i++) {
            _loop_1(i);
        }
    }
    // function comHandler(): void {
    //     setTimeout (function(): void {
    //         if (comVariable == true) {
    //             var randomNumber: number = Math.floor(Math.random());
    //             myArray[randomNumber].symbol = "o";
    //         }
    //     },          300);
    // }
    function clickFunction(positionImArray) {
        // console.log("position is " + positionImArray);
        for (var index = 0; index <= board; index++) {
            if (positionImArray == index) {
                if (currentPlayerIsPlayer0 == true) {
                    hardArray[index].symbol = "x";
                    console.log("Kreuz gedrückt");
                }
                else {
                    hardArray[index].symbol = "o";
                    console.log("Kreis gedrückt");
                }
            }
        }
        currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
        drawField();
        handleWinningResults();
    }
    //gewinnen einer Runde
    var winningConditions = [
        [0, 1, 2, 3, 4],
        [5, 6, 7, 8, 9],
        [10, 11, 12, 13, 14],
        [15, 16, 17, 18, 19],
        [20, 21, 22, 23, 24],
        [0, 5, 10, 15, 20],
        [1, 6, 11, 16, 21],
        [2, 7, 12, 17, 22],
        [3, 8, 13, 18, 23],
        [4, 9, 14, 19, 24],
        [0, 6, 12, 18, 24],
        [4, 8, 12, 16, 20]
    ];
    function handleWinningResults() {
        //durchgehen des Arrays winningCondition 
        for (var i = 0; i <= winningConditions.length; i++) {
            if (hardArray[winningConditions[i][0]].symbol != "free" || hardArray[winningConditions[i][1]].symbol != "free" || hardArray[winningConditions[i][2]].symbol != "free" || hardArray[winningConditions[i][3]].symbol != "free" || hardArray[winningConditions[i][4]].symbol != "free") {
                if (hardArray[winningConditions[i][0]].symbol == hardArray[winningConditions[i][1]].symbol && hardArray[winningConditions[i][1]].symbol == hardArray[winningConditions[i][2]].symbol && hardArray[winningConditions[i][2]].symbol == hardArray[winningConditions[i][3]].symbol && hardArray[winningConditions[i][3]].symbol == hardArray[winningConditions[i][4]].symbol) {
                    roundWon = true;
                    countsEveryRound++;
                    console.log("Runde " + countsEveryRound);
                    console.log("won");
                }
            }
            if (roundWon == true) {
                console.log("RoundEnd function fired");
                scoreHandler();
            }
        }
        for (var index = 0; index <= hardArray.length; index++) {
            var counterFreePosition = 0;
            if (hardArray[index].symbol == "free") {
                counterFreePosition++;
                console.log("free" + counterFreePosition);
            }
        }
        if (counterFreePosition == 0) {
            gameEnding();
        }
    }
    function scoreHandler() {
        if (currentPlayerIsPlayer0 == true) {
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
        for (var i = 0; i < hardArray.length; i++) {
            hardArray[i].symbol = "free";
            comVariable = false;
            roundWon = false;
            drawField();
            console.log("neu zeichnen");
        }
        if (countsEveryRound == hard) {
            endBox();
        }
    }
    function endBox() {
        roundCounter.innerHTML = "";
        gameboard.innerHTML = "";
        containerHard.innerHTML = "";
        console.log("spielfeld löschen");
        if (p1Score >= p2Score) {
            textBox.innerHTML = "the winner is Player 1";
        }
        else if (p2Score >= p1Score) {
            textBox.innerHTML = "the winner is Player 2";
        }
        else if (p1Score == p2Score) {
            textBox.innerHTML = "it's a draw";
        }
        console.log("spielende funktionirt");
        restartButton = document.createElement("button");
        restartButton.classList.add("returnButton");
        restartButton.innerHTML = "restart";
        restartButton.addEventListener("click", comOrPlayerHandler);
        textBox.appendChild(restartButton);
    }
    //mir fehlt:
    // 1. draw
    // 2. com gegner
});
//# sourceMappingURL=typescript_hard.js.map