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


// FUNZIONE CHECKBLOCK TRUE


let checkBlock = () => {
    let firstRandom = randomIndex(board.length);
    let secondRandom = randomIndex(board.length);
    if (!board[firstRandom][secondRandom].block) {
        let dotDiv = document.getElementById(`${firstRandom + '-' + secondRandom}`);
        dotDiv.classList.add('fruit');
        setTimeout(() => {
            dotDiv.classList.remove('fruit');
        }, 5000)
        console.log(board[firstRandom][secondRandom].block);
        console.log(firstRandom,secondRandom);
    }
}

let fruitTimer = setInterval(checkBlock, 15000);











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

    console.log('Index Verticale: ' + positionY + 'Index Orizzionatale: ' + positionX);
    blocksBlock(positionUp,positionDonw,positionLeft,positionRight,positionX,positionY);
    dotEating(positionY,positionX);
}

// FUNZIONE MANGIA PALLINE //
const dotEating = (positionY,positionX) => {
    if (board[positionY][positionX].dot) {
        let dotDiv = document.getElementById(`${positionY+'-'+positionX}`);
        dotDiv.classList.remove('dot-true');
        board[positionY][positionX].dot = false;
        // PUNTEGGIO
        score++;
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
    } else up = true;

    if (board[positionDonw][positionX].block) {
        if (Number.isInteger(pacmanTopPx / 60)) {
            down = false;
        } else {
            down = true;
        }
        
    } else down = true;
    
    if (board[positionY][positionRight].block) {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            right = false;
        } else {
            right = true; 
        }
    } else right = true;
    
    if (board[positionY][positionLeft].block) {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            left = false; 
        } else {
            left = true;
        }
    } else left = true;
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