const board = [
    [1,1,1,1,1,1,1,1,1,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,0,0,0,1,1,0,0,0,0,1],
    [1,1,1,1,0,1,1,0,1,1,1,1],
    [1,1,1,1,0,1,1,0,1,1,1,1],
    [1,0,0,0,0,1,1,0,0,0,0,1],
    [1,0,1,1,0,0,0,0,1,1,0,1],
    [1,0,1,1,0,1,1,0,1,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,1,1,1,1,1,1,1,1,1]
]

const pacman = document.querySelector('#pacman');
let pacmanTop = pacman.style.top;
let pacmanTopPx = parseInt(pacmanTop.substring(0,pacmanTop.length-2));
let pacmanLeft = pacman.style.left;
let pacmanLeftPx = parseInt(pacmanLeft.substring(0,pacmanLeft.length-2));

let up = false;
let down = true;
let left = false;
let right = true;

const boardPosition = () => { 
    let positionX, positionY;  
    positionX = (Math.round(pacmanLeftPx / 60)); 
    positionY = (Math.round(pacmanTopPx / 60));
    
    let positionUp = positionY - 1;
    let positionDonw = positionY + 1;
    let positionLeft = positionX - 1;
    let positionRight = positionX + 1;

    console.log('Index Verticale: ' + positionY + 'Index Orizzionatale: ' + positionX);

    if (board[positionUp][positionX] !== 0) {
        if (Number.isInteger(pacmanTopPx / 60)) {
            up = false;
        } else {
            up = true;
        }
    } else up = true;

    if (board[positionDonw][positionX] !== 0) {
        if (Number.isInteger(pacmanTopPx / 60)) {
            down = false;
        } else {
            down = true;
        }
        
    } else down = true;
    
    if (board[positionY][positionRight] !== 0) {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            right = false;
        } else {
            right = true; 
        }
    } else right = true;
    
    if (board[positionY][positionLeft] !== 0) {
        if (Number.isInteger(pacmanLeftPx / 60)) {
            left = false; 
        } else {
            left = true;
        }
    } else left = true;
}

// MOVIMENTI

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
            coordPrint();
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
            coordPrint();
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
            coordPrint();
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
            coordPrint();
        }
    }
    
}

// STAMPO COORDINATE // da rimuovere!!!
const coordPrint = () => console.log('Top: ' + pacmanTopPx + ' Left: '+ pacmanLeftPx);