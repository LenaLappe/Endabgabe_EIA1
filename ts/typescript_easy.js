window.addEventListener("load", function () {
    //variablen deklarieren
    var levelButtons = document.querySelector(".levelButtons");
    var easyButton = document.getElementById("easyButton");
    var containerEasy = document.querySelector(".containerEasy");
    var players = ["x", "o"];
    var currentPlayer = true;
    var state = "";
    var index = 0;
    var board = 8;
    var field = "";
    var gameboard;
    var myArray = ["free", "free", "free", "free", "free", "free", "free", "free", "free"];
    easyButton.addEventListener("click", drawField);
    easyButton.addEventListener("click", function () {
        //alle Buttons verschwinden lassen
        levelButtons.innerHTML = "";
    });
    function drawField(event) {
        //leichtes Spielfeld mit 9 divs erstellen
        for (index = 0; index <= board; index++) {
            myArray[index];
            gameboard = document.createElement("div");
            gameboard.classList.add("field");
            var idField = document.createAttribute("id");
            idField.value = index.toString();
            containerEasy.appendChild(gameboard);
            console.log(index);
        }
        //Felder werden mit ensprechenden icons gefüllt
        if (players[0]) {
            var turn = document.createElement("i");
            turn.classList.add("fas fa-times");
            console.log("Kreuz");
        }
        else {
            var otherTurn = document.createElement("i");
            otherTurn.classList.add("far fa-circle");
        }
        //überwachung der freien Felder, ob gedrückt wurde
        if (myArray.state == "free") {
            document.querySelector(".field").addEventListener("click", function () { clickFunction(); });
        }
    }
    function clickFunction() {
        if (currentPlayer == true) {
        }
        currentPlayer = !currentPlayer;
        drawField();
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
});
//# sourceMappingURL=typescript_easy.js.map