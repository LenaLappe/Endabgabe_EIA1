window.addEventListener("load", function(): void {

    //variablen deklarieren
    let levelButtons: HTMLElement = document.querySelector(".levelButtons");
    let mediumButton: HTMLElement = document.getElementById("mediumButton");
    let containerMedium: HTMLDivElement = document.querySelector(".containerMedium");
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

    var board: number = 15;
    let gameboard: HTMLDivElement;

    interface FieldType {symbol: string; }
    let mediumArray: FieldType[] = [ {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"}, {symbol: "free"} ];



    mediumButton.addEventListener("click", comOrPlayerHandler);


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
        containerMedium.innerHTML = "";

    //leichtes Spielfeld mit 9 divs erstellen
        for (let i: number = 0; i <= board; i++) {
            
            gameboard = document.createElement("div");
            gameboard.classList.add("field");

            let idField: Attr = document.createAttribute("id");
            idField.value = i.toString();
            


            containerMedium.appendChild(gameboard);
            gameboard.setAttributeNode(idField);
            console.log(i);

        
            roundCounter.innerHTML = "Round " + countsEveryRound + " of 4";
            player1Score.innerHTML = "Player 1: " + p1Score;
            player2Score.innerHTML = "Player 2: " + p2Score;

        //Felder werden mit ensprechenden icons gefüllt
        //Spieler1 = x
            if (mediumArray[i].symbol == "x") {
                const turn: HTMLElement = document.createElement("i");
                turn.classList.add("fas", "fas", "fa-times");
                // turn.style.color = "white";
                // console.log("Kreuz");
                

                gameboard.appendChild(turn);
            }

        //Spieler2 = o
            else if (mediumArray[i].symbol == "o") {
                const otherTurn: HTMLElement = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                // otherTurn.style.color = "white";
                // console.log("Kreis");


                gameboard.appendChild(otherTurn);
            }

        //überwachung der freien Felder, ob gedrückt wurde
            else if (mediumArray[i].symbol == "free") {
                // console.log("i is " + i);
                gameboard.addEventListener("click", function(): void {clickFunction(i); });
            }
        } 

    }


    
    function comHandler(): void {
        console.log("comHandler ");
        setTimeout (function(): void {

            while (true) {
                var randomNumber: number = Math.floor(Math.random() * mediumArray.length);

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

        },          500);
    }

 


    function clickFunction(positionImArray: number): void {
        // console.log("position is " + positionImArray);
        // for (let index: number  = 0; index <= board; index++) {
            // if (positionImArray == index) {
        if (currentPlayerIsPlayer0 === true) {
            mediumArray[positionImArray].symbol = "x";

            console.log("Kreuz gedrückt");

            
            currentPlayerIsPlayer0 = !currentPlayerIsPlayer0;
            
            drawField();
            handleWinningResults();

            if ( comVariable === true) {
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
    const winningConditions: number [][] = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15],
        [0, 4 , 8, 12],
        [1, 5, 9, 13],
        [2, 6, 10, 14],
        [3, 7, 11, 15],
        [0, 5, 10, 15],
        [3, 6, 9, 12]
    ];

   
     
    function handleWinningResults(): void {
        

        //durchgehen des Arrays winningCondition 
        for (let i: number = 0; i < winningConditions.length; i++) {
             
            if  ( mediumArray[winningConditions[i][0]].symbol != "free" || mediumArray[winningConditions[i][1]].symbol != "free" || mediumArray[winningConditions[i][2]].symbol != "free" || mediumArray[winningConditions[i][3]].symbol != "free") {

                if (mediumArray[winningConditions[i][0]].symbol == mediumArray[winningConditions[i][1]].symbol && mediumArray[winningConditions[i][1]].symbol == mediumArray[winningConditions[i][2]].symbol && mediumArray[winningConditions[i][2]].symbol == mediumArray[winningConditions[i][3]].symbol) {
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

        for (let index: number = 0; index < mediumArray.length; index++) {
            
            if (mediumArray[index].symbol == "free") {
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

        for (let i: number = 0; i < mediumArray.length; i++) {

            mediumArray[i].symbol = "free";

            roundWon = false;

            
            console.log("neu zeichnen");
        }

        drawField();

        if (countsEveryRound == medium) {
            endBox();
        }
    }


    function endBox (): void {

        roundCounter.innerHTML = "";
        gameboard.innerHTML = "";
        containerMedium.innerHTML = "";

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
