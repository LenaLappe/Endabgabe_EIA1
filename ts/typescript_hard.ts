window.addEventListener("load", function(): void {

    //variablen deklarieren
    let levelButtons: HTMLElement = document.querySelector(".levelButtons");
    let hardButton: HTMLElement = document.getElementById("hardButton");
    let containerHard: HTMLDivElement = document.querySelector(".containerHard");
    let textBox: HTMLElement = document.querySelector(".textBox");
    let comOrPlayerButton: HTMLElement = document.querySelector(".comOrPlayerButton");
    let playerButton: HTMLButtonElement = document.querySelector(".playerButton");
    let comButton: HTMLButtonElement = document.querySelector(".comButton");
    var restartButton: HTMLButtonElement = document.querySelector(".textBox");

    var roundCounter: HTMLElement = document.querySelector("#roundCounter");
    var player1Score: HTMLElement = document.getElementById("Player1Score");
    var player2Score: HTMLElement = document.getElementById("Player2Score");
    var p1Score: number = 0;
    var p2Score: number = 0;

    var easy: number = 4;
    var medium: number = 5;
    var hard: number = 6;

    var countsEveryRound: number = 1;
    var roundWon: boolean = false;

    
    let currentPlayerIsPlayer0: boolean = true;
    
    var comVariable: boolean = false;

    var board: number = 8;
    let gameboard: HTMLDivElement;

    interface FieldType {symbol: string; }
    let hardArray: FieldType[] = [ {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"} ];



    hardButton.addEventListener("click", comOrPlayerHandler);


    function comOrPlayerHandler(): void {

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
        
        comButton.addEventListener("click", () => {
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



    function drawField(): void {

    // div mit comOrPlayerButtons leeren
        comOrPlayerButton.innerHTML = "";

    //nach jedem durchlauf Container leeren, sonst generieren sich immer neue 9 divs
        containerHard.innerHTML = "";

    //leichtes Spielfeld mit 9 divs erstellen
        for (let i: number = 0; i <= board; i++) {
            
            gameboard = document.createElement("div");
            gameboard.classList.add("field");

            let idField: Attr = document.createAttribute("id");
            idField.value = i.toString();
            


            containerHard.appendChild(gameboard);
            gameboard.setAttributeNode(idField);
            console.log(i);

        
            roundCounter.innerHTML = "Round " + countsEveryRound + " of 3";
            player1Score.innerHTML = "Player 1: " + p1Score;
            player2Score.innerHTML = "Player 2: " + p2Score;

        //Felder werden mit ensprechenden icons gefüllt
        //Spieler1 = x
            if (hardArray[i].symbol == "x") {
                const turn: HTMLElement = document.createElement("i");
                turn.classList.add("fas", "fas", "fa-times");
                // turn.style.color = "white";
                // console.log("Kreuz");
                

                gameboard.appendChild(turn);
            }

        //Spieler2 = o
            else if (hardArray[i].symbol == "o") {
                const otherTurn: HTMLElement = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                // otherTurn.style.color = "white";
                // console.log("Kreis");


                gameboard.appendChild(otherTurn);
            }

        //überwachung der freien Felder, ob gedrückt wurde
            else if (hardArray[i].symbol == "free") {
                // console.log("i is " + i);
                gameboard.addEventListener("click", function(): void {clickFunction(i); });
            }
        } 

    }


    
    function comHandler(): void {
        console.log("comHandler ");
        setTimeout (function(): void {

            while (true) {
                var randomNumber: number = Math.floor(Math.random() * hardArray.length);

                if (hardArray[randomNumber].symbol === "free") {

                    hardArray[randomNumber].symbol = "o";
                    break;
                }
            }

            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;

            drawField();
            handleWinningResults();
            
            console.log("random number is " + randomNumber);
            console.log("comHandler fired");

        },          300);
    }

 


    function clickFunction(positionImArray: number): void {
        // console.log("position is " + positionImArray);
        // for (let index: number  = 0; index <= board; index++) {
            // if (positionImArray == index) {
        if (currentPlayerIsPlayer0 === true) {
            hardArray[positionImArray].symbol = "x";

            console.log("Kreuz gedrückt");

            
            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
            
            drawField();
            handleWinningResults();

            if ( comVariable === true) {
                comHandler();
            }
        } 
        else {
            hardArray[positionImArray].symbol = "o";

            console.log("Kreis gedrückt");

            
            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
            
            drawField();
            handleWinningResults();
        }

            //  }
        // }
        
    }




    //gewinnen einer Runde
    const winningConditions: number [][] = [
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

   
     
    function handleWinningResults(): void {
        

        //durchgehen des Arrays winningCondition 
        for (let i: number = 0; i <= 7; i++) {
             
            if  (hardArray[winningConditions[i][0]].symbol != "free" || hardArray[winningConditions[i][1]].symbol != "free" || hardArray[winningConditions[i][2]].symbol != "free" || hardArray[winningConditions[i][3]].symbol != "free" || hardArray[winningConditions[i][4]].symbol != "free") {

                if (hardArray[winningConditions[i][0]].symbol == hardArray[winningConditions[i][1]].symbol && hardArray[winningConditions[i][1]].symbol == hardArray[winningConditions[i][2]].symbol && hardArray[winningConditions[i][2]].symbol == hardArray[winningConditions[i][3]].symbol && hardArray[winningConditions[i][3]].symbol == hardArray[winningConditions[i][4]].symbol) {
                    roundWon = true;
                    
                    console.log("Runde " + countsEveryRound);
                    console.log ("won");
                }
            } 

            if (roundWon == true) {
               
                console.log("RoundEnd function fired");
                scoreHandler();   
            }
        } 

        let counterFreePosition: number = 0;

        for (let index: number = 0; index < hardArray.length; index++) {
            
            if (hardArray[index].symbol == "free") {
                counterFreePosition++;
                console.log("free " + counterFreePosition);
            }
        }
        if (counterFreePosition === 0) {
            gameEnding();
        }
    }


    function scoreHandler(): void {
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

    

    function gameEnding (): void {

        countsEveryRound++;

        for (let i: number = 0; i < hardArray.length; i++) {

            hardArray[i].symbol = "free";

            roundWon = false;

            
            console.log("neu zeichnen");
        }

        drawField();

        if (countsEveryRound == hard) {
            endBox();
        }
    }


    function endBox (): void {

        roundCounter.innerHTML = "";
        gameboard.innerHTML = "";
        containerHard.innerHTML = "";

        comVariable = false;

        console.log("spielfeld löschen");

        if (p1Score > p2Score) {
            textBox.innerHTML = "the winner is Player 1";
        } else if (p2Score > p1Score) {
            textBox.innerHTML = "the winner is Player 2";
        } else {
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
