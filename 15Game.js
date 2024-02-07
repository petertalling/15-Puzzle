let gameArr = Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15);
shuffleGameArr();
document.getElementById("restartButton").addEventListener("click", restart);
document.getElementById("easyButton").addEventListener("click", easy);

let parent = document.getElementById("buttonsContainer");
let moves = 0;

function createGame() {
    for (let i = 0; i < 16; i++) {
        let picture = document.createElement("div");
        picture.setAttribute("id", "img");
        picture.classList.add("img" + gameArr[i]);
        buttonsContainer.appendChild(picture);
        picture.addEventListener("click", move);
    }
}

function shuffleGameArr() {
    for (let i = 0; i < gameArr.length; i++) {
        let randomPos = gameArr[Math.floor(Math.random() * 16)];
        let temp = gameArr[randomPos];
        gameArr[randomPos] = gameArr[i];
        gameArr[i] = temp;
    }

    //Kolla antalet inversioner och på vilken rad 0an finns. 
    let inversions = 0;
    let zeroBrickRowNum = 0;
    for (let i = 0; i < gameArr.length; i++) {
        if (gameArr[i] == 0) {
            zeroBrickRowNum = Math.floor(i / 4);
        }
        for (let j = 1; j < gameArr.length; j++) {
            if (gameArr[i] != 0 && gameArr[j] != 0 && gameArr[i] > gameArr[j] && i < j) {
                inversions++;
            }
        }
    }

    //kolla om den aktuella speluppsättningen går att lösa.
    if (zeroBrickRowNum % 2 == 0 && inversions % 2 == 0 || zeroBrickRowNum % 2 != 0 && inversions % 2 != 0) {
        console.log("Ej lösbar: " + "inversioner: " + inversions + ". 0 på rad: " + zeroBrickRowNum);
        shuffleGameArr();
    } else {
        console.log("Lösbar: " + "inversioner: " + inversions + ". 0 på rad: " + zeroBrickRowNum);
        createGame();
    }
}

function move() {
    //Kolla vilken siffra den markerade brickan har
    for (let i = 0; i < gameArr.length; i++) {
        if (this.className == "img" + gameArr[i]) {
            //kolla om 0an är till vänster
            if (i != 0 && i != 4 && i != 8 && i != 12 && gameArr[i - 1] == 0) {
                gameArr[i - 1] = gameArr[i];
                updateBoard(this, i);
                return;
            }
            //kolla om 0an är till höger
            if (i != 3 && i != 7 && i != 11 && i != 15 && gameArr[i + 1] == 0) {
                gameArr[i + 1] = gameArr[i];
                updateBoard(this, i);
                return;
            }
            //kolla om 0an är ovanför
            if (i > 3 && gameArr[i - 4] == 0) {
                gameArr[i - 4] = gameArr[i];
                updateBoard(this, i);
                return;
            }
            //kolla om 0an är nedanför
            if (i < 12 && gameArr[i + 4] == 0) {
                gameArr[i + 4] = gameArr[i];
                updateBoard(this, i);
                return;
            }
        }
    }
}

function updateBoard(clickedSquare, index) {
    document.querySelector(".img0").classList.replace("img0", "img" + gameArr[index]);
    clickedSquare.classList.replace("img" + gameArr[index], "img0");
    gameArr[index] = 0;
    moves++;
    document.getElementById("h1").innerHTML = "Moves: " + moves;
    winChecker();
}

function easy() {
    const list = document.getElementById("buttonsContainer");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    gameArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 0, 15];
    createGame();
}

function winChecker() {
    if (gameArr.join() == "1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,0") {
        console.log("Du vann!");
        document.getElementById("h1").innerHTML = "Awesome! You won in " + moves + " moves";
    }
}

function restart() {
    const list = document.getElementById("buttonsContainer");
    while (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
    moves = 0;
    document.getElementById("h1").innerHTML = "Moves: " + moves;
    shuffleGameArr();
}



