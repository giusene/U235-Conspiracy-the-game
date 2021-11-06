export const hero = (boardDiv, board, score, scoreBoard, level) => {
    scoreBoard.textContent = score;
    let pacmanPositionX = 1;
    let pacmanPositionY = 1;
    // PACMAN POSITION
    const pacman = document.createElement('div');
    pacman.setAttribute('id', '#pacman');
    pacman.classList.add('pacman-stop');
    pacman.style.top = '60px';
    pacman.style.left = '60px';
    boardDiv.appendChild(pacman);
    let pacmanTop = pacman.style.top;
    let pacmanTopPx = parseInt(pacmanTop.substring(0, pacmanTop.length - 2));
    let pacmanLeft = pacman.style.left;
    let pacmanLeftPx = parseInt(pacmanLeft.substring(0, pacmanLeft.length - 2));

    let up = false;
    let down = true;
    let left = false;
    let right = true;


    // FUNZIONE CHE DETERMINA LA POSIZIONE NELLO SCHEMA (ARRAY)
    const boardPosition = () => {
        let positionX, positionY;
        positionX = (Math.round(pacmanLeftPx / 60));
        positionY = (Math.round(pacmanTopPx / 60));

        let positionUp = positionY - 1;
        let positionDown = positionY + 1;
        let positionLeft = positionX - 1;
        let positionRight = positionX + 1;

        console.log('PACMAN X: ' + positionX + ' PACAMAN Y: ' + positionY);
        blocksBlock(positionUp, positionDown, positionLeft, positionRight, positionX, positionY);
        dotEating(positionY, positionX);
        pacmanPositionX = positionX;
        pacmanPositionY = positionY;
    }

    // FUNZIONE MANGIA PALLINE //
    const dotEating = (positionY, positionX) => {
        let dotDiv = document.getElementById(`${positionY + '-' + positionX}`);
        let scorePrint = document.querySelector('h3');
        if (board[positionY][positionX].dot) {
            dotDiv.classList.remove('dot-true');
            board[positionY][positionX].dot = false;
            // PUNTEGGIO
            score++;
        }
        // PUNTEGGIO FRUTTA
        if (board[positionY][positionX].fruit) {
            score += 10;
            board[positionY][positionX].fruit = false;
            dotDiv.classList.remove('fruit');
        }

        scoreBoard.textContent = score;
    }


    // FUNZIONE PER EVITARE OSTACOLI //
    const blocksBlock = (positionUp, positionDown, positionLeft, positionRight, positionX, positionY) => {

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

        if (board[positionDown][positionX].block) {
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
                pacmanTopPx -= 10;
                pacman.style.top = pacmanTopPx + 'px';
                pacman.classList.add('rotate-up');
                pacman.classList.remove('rotate-down', 'rotate-left', 'rotate-right');
                boardPosition();
            }
        }

        // down
        if (event.keyCode === 40) {
            if (down) {
                pacmanTopPx += 10;
                pacman.style.top = pacmanTopPx + 'px';
                pacman.classList.add('rotate-down');
                pacman.classList.remove('rotate-left', 'rotate-up', 'rotate-right');
                boardPosition();
            }
        }

        // left
        if (event.keyCode === 37) {
            if (left) {
                pacmanLeftPx -= 10;
                pacman.style.left = pacmanLeftPx + 'px';
                pacman.classList.add('rotate-left');
                pacman.classList.remove('rotate-right', 'rotate-down', 'rotate-up');
                boardPosition();
            }

        }
        // right
        if (event.keyCode === 39) {
            if (right) {
                pacmanLeftPx += 10;
                pacman.style.left = pacmanLeftPx + 'px';
                pacman.classList.add('rotate-right');
                pacman.classList.remove('rotate-left', 'rotate-down', 'rotate-up');
                boardPosition();
            }
        }

    }

    // ENEMY POSITION
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.setAttribute('id', '#enemy');
    enemy.style.top = '600px';
    enemy.style.left = '600px';
    boardDiv.appendChild(enemy);
    let enemyTop = enemy.style.top;
    let enemyTopPx = parseInt(enemyTop.substring(0, enemyTop.length - 2));
    let enemyLeft = enemy.style.left;
    let enemyLeftPx = parseInt(enemyLeft.substring(0, enemyLeft.length - 2));

    // FUNZIONE MOVIMENTO NEMICI //
    const enemiesAi = () => {
        // posizione nemico
        let enemyPositionX = (Math.round(enemyLeftPx / 60));
        let enemyPositionY = (Math.round(enemyTopPx / 60));

        let checkPosition = [
            {
                diff: Math.abs(pacmanPositionY - enemyPositionY),
                left: 0,
                top: -60,
                positionY: -1,
                positionX: 0,
                enemyX: true,
                enemyY: Math.abs(enemyPositionY - 1 - pacmanPositionY) < Math.abs(enemyPositionY + 1 - pacmanPositionY) ? true : false,
                block: board[enemyPositionY - 1][enemyPositionX].block,
            },
            {
                diff: Math.abs(pacmanPositionY - enemyPositionY),
                left: 0,
                top: 60,
                positionY: 1,
                positionX: 0,
                enemyX: true,
                enemyY: Math.abs(enemyPositionY - 1 - pacmanPositionY) > Math.abs(enemyPositionY + 1 - pacmanPositionY) ? true : false,
                block: board[enemyPositionY + 1][enemyPositionX].block,
            },
            {
                diff: Math.abs(pacmanPositionX - enemyPositionX),
                left: -60,
                top: 0,
                positionY: 0,
                positionX: -1,
                enemyX: Math.abs(enemyPositionX - 1 - pacmanPositionX) < Math.abs(enemyPositionX + 1 - pacmanPositionX) ? true : false,
                enemyY: true,
                block: board[enemyPositionY][enemyPositionX - 1].block,
            },
            {
                diff: Math.abs(pacmanPositionX - enemyPositionX),
                left: 60,
                top: 0,
                positionY: 0,
                positionX: 1,
                enemyX: Math.abs(enemyPositionX - 1 - pacmanPositionX) > Math.abs(enemyPositionX + 1 - pacmanPositionX) ? true : false,
                enemyY: true,
                block: board[enemyPositionY][enemyPositionX + 1].block,
            }
        ];

        const bestPosition = checkPosition.sort(function (a, b) {
            if (a.enemyX && !b.enemyX) return -1;
            if (!a.enemyX && b.enemyX) return 1;

            if (!a.enemyY && b.enemyY) return -1;
            if (a.enemyY && !b.enemyY) return 1;

            return a.diff - b.diff

        })

        let verify = 0;
        for (let pos of bestPosition) {
            verify++
            if (!pos.block && pos.enemyX && pos.enemyY) {
                enemyTopPx += pos.top;
                enemyLeftPx += pos.left;
                enemyPositionX += pos.positionX;
                enemyPositionY += pos.positionY;
                break;
            }
            if (verify === 4) {
                for (let posSecond of bestPosition) {
                    if (!posSecond.block && posSecond.diff === 0) {
                        enemyTopPx += posSecond.top;
                        enemyLeftPx += posSecond.left;
                        enemyPositionX += posSecond.positionX;
                        enemyPositionY += posSecond.positionY;
                        break;
                    }
                }
            }
        }

        enemy.style.top = enemyTopPx + 'px';
        enemy.style.left = enemyLeftPx + 'px';
    }

    // FUNZIONE MOVIMENTO NEMICI TEMPORIZZATO  ////
    let enemySpeed;
    switch (level) {
        case 0: 
        enemySpeed = 2500;
        break;
        case 1: 
        enemySpeed = 2000;
        break;
        case 2: 
        enemySpeed = 1500;
        break;
        case 3: 
        enemySpeed = 1000;
        break;
        case 4: 
        enemySpeed = 500;
        break;
    }

    setInterval(() => {
        enemiesAi();
    }, enemySpeed);
}