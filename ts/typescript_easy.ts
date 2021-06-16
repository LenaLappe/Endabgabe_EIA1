window.addEventListener("load", function(): void {


    //variablen deklarieren
    let levelButtons: HTMLElement = document.querySelector(".levelButtons");
    let easyButton: HTMLElement = document.getElementById("easyButton");
    let containerEasy: HTMLDivElement = document.querySelector(".containerEasy");


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
            console.log(i);

        
        

        //Felder werden mit ensprechenden icons gefüllt
        //Spieler1 = x
            if (myArray[i].symbol == "x") {
                const turn: HTMLElement = document.createElement("i");
                turn.classList.add("fas", "fa-times");
                turn.style.color = "white";
                turn.style.fontFamily = "cryon";
                console.log("Kreuz");
                

                gameboard.appendChild(turn);
            }

        //Spieler2 = o
             else if (myArray[i].symbol == "o") {
                const otherTurn: HTMLElement = document.createElement("i");
                otherTurn.classList.add("far", "fa-circle");
                otherTurn.style.color = "white";
                otherTurn.style.fontFamily = "cryon";
                console.log("Kreis");


                gameboard.appendChild(otherTurn);
            }


        //überwachung der freien Felder, ob gedrückt wurde
            else if (myArray[i].symbol == "free") {
                console.log("i is " + i);
                gameboard.addEventListener("click", function(): void {clickFunction(i); });
            }
        
        }
        
    }


 


    function clickFunction(positionImArray: number): void {
        console.log("position is " + positionImArray);
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