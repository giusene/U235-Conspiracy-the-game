const boardScheme = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,0,0,0,1,1,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,1,1,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
]

let board = [];

for (lines of boardScheme) {
    let newLine = [];
    for (box of lines) {
        let objectBox;
            if (box === 0) {
                objectBox = {
                    block: false,
                    dot: true,
                    fruit: false
                    }
                
            } else {
                objectBox = {
                    block: true,
                    dot: false,
                    fruit: false
                    }
            }
        newLine.push(objectBox);
    }
    board.push(newLine);
}

const boardDiv = document.querySelector('.board');


for (let i = 0 ; i < board.length; i++) {
    for (let ii = 0 ; ii < board[0].length; ii++) {
        let dotDiv = document.createElement('div');
        dotDiv.classList.add('dot');
        dotDiv.setAttribute('id', `${[i]+'-'+[ii]}`);
        if (board[i][ii].dot) {
            dotDiv.classList.add('dot-true');
        }
        if (board[i][ii].block) {
            dotDiv.classList.add('block-true');
        }
        boardDiv.appendChild(dotDiv);
    }
}

// FUNZIONE FRUTTA
const randomIndex = (maxLimit) => {
    return Math.floor(Math.random() * maxLimit)
}

let checkBlock = () => {
    let firstRandom = randomIndex(board.length);
    let secondRandom = randomIndex(board.length);
    if (!board[firstRandom][secondRandom].block) {
        let dotDiv = document.getElementById(`${firstRandom + '-' + secondRandom}`);
        dotDiv.classList.add('fruit');
        board[firstRandom][secondRandom].fruit = true;
        setTimeout(() => {
            dotDiv.classList.remove('fruit');
            board[firstRandom][secondRandom].fruit = false;
        }, 5000)
    }
}

let fruitTimer = setInterval(checkBlock, 15000);

// PACMAN POSITION
const pacman = document.querySelector('#pacman');
let pacmanTop = pacman.style.top;
let pacmanTopPx = parseInt(pacmanTop.substring(0,pacmanTop.length-2));
let pacmanLeft = pacman.style.left;
let pacmanLeftPx = parseInt(pacmanLeft.substring(0,pacmanLeft.length-2));

let up = false;
let down = true;
let left = false;
let right = true;
let score = -1;


// FUNZIONE CHE DETERMINA LA POSIZIONE NELLO SCHEMA (ARRAY)
const boardPosition = () => { 
    let positionX, positionY;  
    positionX = (Math.round(pacmanLeftPx / 60)); 
    positionY = (Math.round(pacmanTopPx / 60));
    
    let positionUp = positionY - 1;
    let positionDonw = positionY + 1;
    let positionLeft = positionX - 1;
    let positionRight = positionX + 1;

    console.log('PACMAN X: ' + positionX + ' PACAMAN Y: ' + positionY);
    blocksBlock(positionUp,positionDonw,positionLeft,positionRight,positionX,positionY);
    dotEating(positionY,positionX);
    enemiesAi(positionX,positionY);
}

// FUNZIONE MANGIA PALLINE //
const dotEating = (positionY,positionX) => {
    if (board[positionY][positionX].dot) {
        let dotDiv = document.getElementById(`${positionY+'-'+positionX}`);
        dotDiv.classList.remove('dot-true');
        board[positionY][positionX].dot = false;
        // PUNTEGGIO
        score++;
        if (board[positionY][positionX].fruit) {
            score+=10;
            board[positionY][positionX].fruit = false;
            dotDiv.classList.remove('fruit');
        }
        let scorePrint = document.querySelector('h3');
        scorePrint.querySelector('span').textContent = score;
    }
}


// FUNZIONE PER EVITARE OSTACOLI //
const blocksBlock = (positionUp,positionDonw,positionLeft,positionRight,positionX,positionY) => {

    if (board[positionUp][positionX].block) {
        if (Number.isInteger(pacmanTopPx / 60)) {
            up = false;
        } else {
            up = true;
        }
    } else {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            up = true;
        } else {
            up = false;
        }

    } 

    if (board[positionDonw][positionX].block) {
        if (Number.isInteger(pacmanTopPx / 60)) {
            down = false;
        } else {
            down = true;
        }
        
    } else {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            down = true;
        } else {
            down = false;
        }

    } 
    
    if (board[positionY][positionRight].block) {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            right = false;
        } else {
            right = true; 
        }
    } else {
        if (Number.isInteger(pacmanTopPx / 60)) {
            right = true;
        } else {
            right = false;
        }
    }

    if (board[positionY][positionLeft].block) {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            left = false; 
        } else {
            left = true;
        }
    } else {
        if (Number.isInteger(pacmanTopPx / 60)) {
            left = true;
        } else {
            left = false;
        }
    } 
}

// FUNZIONE MOVIMENTI //
document.onkeydown = arrowPress;
document.onkeyup = arrowUp;

function arrowUp() {
    pacman.classList.remove('pacman');
    pacman.classList.add('pacman-stop');  
}

function arrowPress(event) {
    pacman.classList.add('pacman');
    pacman.classList.remove('pacman-stop');
    // up
    if (event.keyCode === 38) {
        if (up) {
            pacmanTopPx-=5;
            pacman.style.top = pacmanTopPx+'px';
            pacman.classList.add('rotate-up');
            pacman.classList.remove('rotate-down', 'rotate-left', 'rotate-right');
            boardPosition();
        }
    }

    // down
    if (event.keyCode === 40) {
        if (down) {
            pacmanTopPx+=5;
            pacman.style.top = pacmanTopPx+'px';
            pacman.classList.add('rotate-down');
            pacman.classList.remove('rotate-left', 'rotate-up', 'rotate-right');
            boardPosition();
        }  
    }

    // left
    if (event.keyCode === 37) {
        if (left) {
            pacmanLeftPx-=5;
            pacman.style.left = pacmanLeftPx+'px';
            pacman.classList.add('rotate-left');
            pacman.classList.remove('rotate-right', 'rotate-down','rotate-up');
            boardPosition();
        }
        
    }
    // right
    if (event.keyCode === 39) {
        if (right) {
            pacmanLeftPx+=5;
            pacman.style.left = pacmanLeftPx+'px';
            pacman.classList.add('rotate-right');
            pacman.classList.remove('rotate-left', 'rotate-down', 'rotate-up');
            boardPosition();
        }
    }
    
}

// ENEMY POSITION
const enemy = document.querySelector('#enemy');
let enemyTop = enemy.style.top;
let enemyTopPx = parseInt(enemyTop.substring(0,enemyTop.length-2));
let enemyLeft = enemy.style.left;
let enemyLeftPx = parseInt(enemyLeft.substring(0,enemyLeft.length-2));

// posizione nemico
let enemyPositionX = (Math.round(enemyLeftPx / 60)); 
let enemyPositionY = (Math.round(enemyTopPx / 60));

let enemyPxTop, enemyPxLeft

// FUNZIONE MOVIMENTO NEMICI //
const enemiesAi = (pacmanPositionX,pacmanPositionY) => {

    let positionUp = enemyPositionY - 1;
    let positionDonw = enemyPositionY + 1;
    let positionLeft = enemyPositionX - 1;
    let positionRight = enemyPositionX + 1;

    ///////// DA VEDERE DA QUESTO PUNTO ///////////////
    //////// SONO SBAGLIATI I MOVIMENTI //////////////

    if ((pacmanPositionX - enemyPositionX) > (pacmanPositionY - enemyPositionY)) {
        if (pacmanPositionX >= enemyPositionX) {
            enemyPositionX--;
            enemyPxTop = 0;
            enemyPxLeft = -60;
            console.log('NEMICO X:' + enemyPositionX + ' NEMICO Y: ' + enemyPositionY)
        } else {
            enemyPositionX++;
            enemyPxTop = 0;
            enemyPxLeft = 60;
            console.log('NEMICO X:' + enemyPositionX + ' NEMICO Y: ' + enemyPositionY)
        }
    } else {
        if (pacmanPositionY >= enemyPositionY) {
            enemyPositionY--;
            enemyPxTop = -60;
            enemyPxLeft = 0;
            console.log('NEMICO X:' + enemyPositionX + ' NEMICO Y: ' + enemyPositionY)
        } else {
            enemyPositionY++;
            enemyPxTop = -60;
            enemyPxLeft = 0;
            console.log('NEMICO X:' + enemyPositionX + ' NEMICO Y: ' + enemyPositionY)
        }
    }
    console.log(enemyPxTop,enemyPxLeft)
}

console.log(enemyPxTop,enemyPxLeft)

// FUNZIONE MOVIMENTO NEMICI TEMPORIZZATO  ////
/////  (L'INTERVALLO DI TEMPO è LA DIFFICOLTA/VELOCITA DEL NEMICO)
setInterval(() => {
    enemyTopPx += enemyPxTop;
    enemyLeftPx += enemyPxLeft;
    enemy.style.top = enemyTopPx + 'px';
    enemy.style.left = enemyLeftPx +'px';
  }, 3000);