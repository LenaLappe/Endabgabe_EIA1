window.addEventListener("load", function () {
    //variablen deklarieren
    var levelButtons = document.querySelector(".levelButtons");
    var easyButton = document.getElementById("easyButton");
    var containerEasy = document.querySelector(".containerEasy");
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
                turn.classList.add("fas", "fa-times");
                turn.style.color = "white";
                turn.style.fontFamily = "cryon";
                console.log("Kreuz");
                gameboard.appendChild(turn);
            }
            //Spieler2 = o
            else if (myArray[i].symbol == "o") {
                var otherTurn = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                otherTurn.style.color = "white";
                otherTurn.style.fontFamily = "cryon";
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