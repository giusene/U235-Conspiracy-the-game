import { mainMenu } from "./main_menu.js";
import { levelGenerator } from "./level_generator.js";

export const stageRender = () => {
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'sidebar');
    sideBar.classList.add('sidebar');
    sideBar.style.left = '-2000px';

    // create exit button
    const exitBtn = document.createElement('a');
    exitBtn.classList.add('exit-btn');
    exitBtn.classList.add('button');
    exitBtn.setAttribute('id', 'exit-btn');
    exitBtn.textContent = 'exit';

    // create scoreboard
    const scoreBoard = document.createElement('div');
    scoreBoard.classList.add('score-board');
    scoreBoard.setAttribute('id', 'score-board');

    // create board
    const boardDiv = document.createElement('div');
    boardDiv.setAttribute('id', 'board');
    boardDiv.classList.add('board');
    boardDiv.style.right = '-2000px';

    // create countdown
    const countdown = document.createElement('div');
    countdown.setAttribute('id', 'countdown');
    countdown.classList.add('countdown');

    let countText = 3;
    const timerCount = () => {
        if (countText === 0) {
            clearInterval(timerFunc)
            countdown.textContent = 'GO!';
            setTimeout(() => boardDiv.removeChild(countdown), 1000)
        } else {
            countdown.textContent = countText;
            countText--
        }
    }

    const timerFunc = setInterval(timerCount, 1000)

    mainContainer.appendChild(sideBar);
    mainContainer.appendChild(boardDiv);
    boardDiv.appendChild(countdown);
    sideBar.appendChild(scoreBoard);
    sideBar.appendChild(exitBtn);

    setTimeout(() => {
        sideBar.classList.add('left-animation');
        boardDiv.classList.add('right-animation');
    }, 100)

    exitBtn.addEventListener('click', () => {
        sideBar.classList.remove('left-animation');
        boardDiv.classList.remove('right-animation');

        setTimeout(() => {
            mainContainer.classList.remove('horizontal');
            mainContainer.removeChild(sideBar);
            mainContainer.removeChild(boardDiv);
            mainMenu('-1000px', '1000px');
        }, 1000)
    })

    levelGenerator(0, 3, 0, boardDiv, scoreBoard);

}


const mainContainer = document.querySelector('main')