window.addEventListener("load", function(): void {


    //variablen deklarieren
    let levelButtons: HTMLElement = document.querySelector(".levelButtons");
    let easyButton: HTMLElement = document.getElementById("easyButton");
    let containerEasy: HTMLDivElement = document.querySelector(".containerEasy");

    var players = ["x", "o"];
    let currentPlayer: boolean = true;

    let state: string = "";
    let index: number = 0;

    var board: number = 8; 
    var  field: string = "";
    let gameboard: HTMLDivElement;
    let myArray: string[] = ["free", "free", "free", "free", "free", "free", "free", "free", "free"];



    easyButton.addEventListener("click", drawField);



    easyButton.addEventListener("click", function(): void {
        //alle Buttons verschwinden lassen
        levelButtons.innerHTML = "";

    });


    function drawField(event): void {
        //leichtes Spielfeld mit 9 divs erstellen
       
        for (index = 0; index <= board; index++) {
            myArray[index];
            
            gameboard = document.createElement("div");
            gameboard.classList.add("field");

            let idField: Attr = document.createAttribute("id");
            idField.value = index.toString();
            


            containerEasy.appendChild(gameboard);
            console.log(index);
        }

        //Felder werden mit ensprechenden icons gefüllt
        if (players[0]) {
            const turn: HTMLElement = document.createElement("i");
            turn.classList.add("fas fa-times");
            console.log("Kreuz");
        }
        else {
            const otherTurn: HTMLElement = document.createElement("i");
            otherTurn.classList.add("far fa-circle");
        }


        //überwachung der freien Felder, ob gedrückt wurde
        if (myArray.state == "free") {
            document.querySelector(".field").addEventListener("click", function(): void {clickFunction(); });
        }


    }


 


    function clickFunction(): void {
        if (currentPlayer == true) {
            
        }

        currentPlayer =! currentPlayer;
        drawField();
    }


    //gewinnen einer Runde
    const winningConditions = [
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