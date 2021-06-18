window.addEventListener("load", function () {
    //variablen deklarieren
    var levelButtons = document.querySelector(".levelButtons");
    var easyButton = document.getElementById("easyButton");
    var containerEasy = document.querySelector(".containerEasy");
    var textBox = document.querySelector(".textBox");
    var roundCounter = document.querySelector("#roundCounter");
    var player1Score = document.getElementById("Player1Score");
    var player2Score = document.getElementById("Player2Score");
    var easy = 3;
    var medium = 4;
    var hard = 5;
    var countsEveryRound = 0;
    var currentPlayerIsPlayer0 = true;
    var board = 8;
    var gameboard;
    var myArray = [{ symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }, { symbol: "free" }];
    easyButton.addEventListener("click", drawField);
    function drawField() {
        //alle Buttons verschwinden lassen und HTML einmal grundleeren
        levelButtons.innerHTML = "";
        //nach jedem durchlauf Container leeren, sonst generieren sich immer neue 9 divs
        containerEasy.innerHTML = "";
        var _loop_1 = function (i) {
            gameboard = document.createElement("div");
            gameboard.classList.add("field");
            var idField = document.createAttribute("id");
            idField.value = i.toString();
            containerEasy.appendChild(gameboard);
            gameboard.setAttributeNode(idField);
            console.log(i);
            //Felder werden mit ensprechenden icons gefüllt
            //Spieler1 = x
            if (myArray[i].symbol == "x") {
                var turn = document.createElement("i");
                turn.classList.add("fas", "fas", "fa-times");
                // turn.style.color = "white";
                console.log("Kreuz");
                gameboard.appendChild(turn);
            }
            //Spieler2 = o
            else if (myArray[i].symbol == "o") {
                var otherTurn = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                // otherTurn.style.color = "white";
                console.log("Kreis");
                gameboard.appendChild(otherTurn);
            }
            //überwachung der freien Felder, ob gedrückt wurde
            else if (myArray[i].symbol == "free") {
                console.log("i is " + i);
                gameboard.addEventListener("click", function () { clickFunction(i); });
            }
        };
        //leichtes Spielfeld mit 9 divs erstellen
        for (var i = 0; i <= board; i++) {
            _loop_1(i);
        }
    }
    function clickFunction(positionImArray) {
        console.log("position is " + positionImArray);
        for (var index = 0; index <= board; index++) {
            if (positionImArray == index) {
                if (currentPlayerIsPlayer0 == true) {
                    myArray[index].symbol = "x";
                    console.log("Kreuz gedrückt");
                }
                else {
                    myArray[index].symbol = "o";
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
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    function handleWinningResults() {
        //durchgehen des Arrays winningCondition 
        for (var i = 0; i <= 7; i++) {
            var roundWon = false;
            if (myArray[winningConditions[i][0]].symbol != "free" || myArray[winningConditions[i][1]].symbol != "free" || myArray[winningConditions[i][2]].symbol != "free") {
                if (myArray[winningConditions[i][0]].symbol == myArray[winningConditions[i][1]].symbol && myArray[winningConditions[i][1]].symbol == myArray[winningConditions[i][2]].symbol) {
                    roundWon = true;
                    countsEveryRound++;
                    console.log("Runde " + countsEveryRound);
                    console.log("won");
                }
            }
            if (roundWon == true) {
                console.log("check counter");
                updateCounter();
                console.log("End function fired");
                gameEnding();
            }
        }
    }
    function updateCounter() {
        roundCounter.innerHTML = "Round " + countsEveryRound + " of " + easy;
    }
    function gameEnding() {
        console.log("ending");
        containerEasy.innerHTML = "";
        drawField();
    }
    // function allEquale(a, b, c): boolean {
    //     if(a == b && b == c) {
    //        return true;
    //     }
    //     else {
    //        return false;
    //     }
    //  }
    // //vertikal
    // if (allEquale(gameboard[i][0], gameboard[i][1], gameboard[i][2] )) {
    //     roundWon = true;
    //     console.log("vertikal");
    //     break;
    // }  
    // //horizontal
    // else if (allEquale(gameboard[0][i], gameboard[1][i], gameboard[2][i])) {
    //     roundWon = true;
    //     console.log("horizontal")
    //     break;
    // }  
    // //diagonal
    // else if (allEquale(gameboard[0][0], gameboard[1][1], gameboard[2][2])) {
    //     roundWon = true;
    //     console.log("diagonal1")
    // }
    // else if (allEquale(gameboard[2][0], gameboard[1][1], gameboard[0][2])) {
    //     roundWon = true;
    //     console.log("diagonal2")
    // }
});
//# sourceMappingURL=typescript_easy.js.map