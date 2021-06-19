window.addEventListener("load", function(): void {

    //variablen deklarieren
    let levelButtons: HTMLElement = document.querySelector(".levelButtons");
    let easyButton: HTMLElement = document.getElementById("easyButton");
    let containerEasy: HTMLDivElement = document.querySelector(".containerEasy");
    let textBox: HTMLElement = document.querySelector(".textBox");

    var roundCounter: HTMLElement = document.querySelector("#roundCounter");
    var player1Score: HTMLElement = document.getElementById("Player1Score");
    var player2Score: HTMLElement = document.getElementById("Player2Score");

    var easy: number = 3;
    var medium: number = 4;
    var hard: number = 5;

    var countsEveryRound: number = 1;
    var roundWon: boolean = false;

    
    let currentPlayerIsPlayer0: boolean = true;
    


    var board: number = 8;
    let gameboard: HTMLDivElement;

    interface FieldType {symbol: string; }
    let myArray: FieldType[] = [ {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"} ];



    easyButton.addEventListener("click", drawField);


    function drawField(): void {

        //alle Buttons verschwinden lassen und HTML einmal grundleeren
        levelButtons.innerHTML = "";

        //nach jedem durchlauf Container leeren, sonst generieren sich immer neue 9 divs
        containerEasy.innerHTML = "";

        //leichtes Spielfeld mit 9 divs erstellen
        for (let i: number = 0; i <= board; i++) {
            
            gameboard = document.createElement("div");
            gameboard.classList.add("field");

            let idField: Attr = document.createAttribute("id");
            idField.value = i.toString();
            


            containerEasy.appendChild(gameboard);
            gameboard.setAttributeNode(idField);
            // console.log(i);

        
            roundCounter.innerHTML = "Round " + countsEveryRound + " of " + easy;

        //Felder werden mit ensprechenden icons gefüllt
        //Spieler1 = x
            if (myArray[i].symbol == "x") {
                const turn: HTMLElement = document.createElement("i");
                turn.classList.add("fas", "fas", "fa-times");
                // turn.style.color = "white";
                // console.log("Kreuz");
                

                gameboard.appendChild(turn);
            }

        //Spieler2 = o
             else if (myArray[i].symbol == "o") {
                const otherTurn: HTMLElement = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                // otherTurn.style.color = "white";
                // console.log("Kreis");


                gameboard.appendChild(otherTurn);
            }


        //überwachung der freien Felder, ob gedrückt wurde
            else if (myArray[i].symbol == "free") {
                // console.log("i is " + i);
                gameboard.addEventListener("click", function(): void {clickFunction(i); });
            }
        } 
    }


 


    function clickFunction(positionImArray: number): void {
        // console.log("position is " + positionImArray);
        for (let index: number  = 0; index <= board; index++) {
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
        drawField()

        handleWinningResults();
    }




    //gewinnen einer Runde
    const winningConditions: number [][] = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

   
     
    function handleWinningResults(): void {
        

        //durchgehen des Arrays winningCondition 
        for (let i: number = 0; i <= 7; i++) {
             

            if  (myArray[winningConditions[i][0]].symbol != "free" || myArray[winningConditions[i][1]].symbol != "free" || myArray[winningConditions[i][2]].symbol != "free") {

                if (myArray[winningConditions[i][0]].symbol == myArray[winningConditions[i][1]].symbol && myArray[winningConditions[i][1]].symbol == myArray[winningConditions[i][2]].symbol) {
                    roundWon = true;
                    countsEveryRound++;
                    console.log("Runde " + countsEveryRound);
                    console.log ("won");
                }
            }

            if (roundWon == true) {
               
                console.log("RoundEnd function fired");
                gameEnding();
                    
            }
            
        } 
    }

    
    

    function gameEnding (): void {

        for (let i: number = 0; i <= board; i++) {

            myArray[i].symbol = "free";

            roundWon = false;
            drawField();
            console.log("neu zeichnen");
        }

        if (countsEveryRound == easy) {
            endBox();
        }
    }


    function endBox (): void {

        gameboard.innerHTML = "";
        containerEasy.innerHTML = "";
        console.log("spielfeld löschen");
        textBox.innerHTML = "the winner is";
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