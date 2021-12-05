import { mainMenu } from "./main_menu.js";
import { levelGenerator } from "./level_generator.js";

export const stageRender = () => {
    // create controls for mobile

    const controls = document.querySelector('#controls')


    // create controls for mobile
    const controlsSxBox = document.createElement('div');
    controlsSxBox.setAttribute('id', 'controls-sx-box');
    controlsSxBox.classList.add('controls-sx-box');

    const controlsUp = document.createElement('a');
    controlsUp.setAttribute('id', 'controls-up');
    controlsUp.classList.add('controls-up');
    const controlsDown = document.createElement('a');
    controlsDown.setAttribute('id', 'controls-down');
    controlsDown.classList.add('controls-down');
    
    // create controls for mobile
    const controlsDxBox = document.createElement('div');
    controlsDxBox.setAttribute('id', 'controls-dx-box');
    controlsDxBox.classList.add('controls-dx-box');

    const controlsLeft = document.createElement('a');
    controlsLeft.setAttribute('id', 'controls-left');
    controlsLeft.classList.add('controls-left');
    const controlsRight = document.createElement('a');
    controlsRight.setAttribute('id', 'controls-right');
    controlsRight.classList.add('controls-right');



    // create sidebar
    const sideBar = document.createElement('div');
    sideBar.setAttribute('id', 'sidebar');
    sideBar.classList.add('sidebar');
    sideBar.style.left = '-2000px';

    // create exit button
    const exitBtn = document.createElement('a');
    exitBtn.classList.add('exit-btn');
    exitBtn.setAttribute('id', 'exit-btn');

    // create scoreboard
    const scoreBoard = document.createElement('div');
    scoreBoard.classList.add('score-board');
    scoreBoard.setAttribute('id', 'score-board');

    const levelBoard = document.createElement('div');
    levelBoard.classList.add('level-board');
    levelBoard.setAttribute('id', 'level-board');


    const livesBoard = document.createElement('div');
    livesBoard.classList.add('lives-board');
    livesBoard.setAttribute('id', 'lives-board');

    const liveOne = document.createElement('div');
    liveOne.classList.add('live');
    livesBoard.appendChild(liveOne);

    const liveTwo = document.createElement('div');
    liveTwo.classList.add('live');
    livesBoard.appendChild(liveTwo);

    const liveThree = document.createElement('div');
    liveThree.classList.add('live');
    livesBoard.appendChild(liveThree);



    // create board
    const boardDiv = document.createElement('div');
    boardDiv.setAttribute('id', 'board');
    boardDiv.classList.add('board');
    boardDiv.style.right = '-2000px';

    

    // mainContainer.appendChild(controls);

    controls.appendChild(controlsSxBox);
    controls.appendChild(controlsDxBox);

    controlsSxBox.appendChild(controlsUp);
    controlsSxBox.appendChild(controlsDown);
    controlsDxBox.appendChild(controlsLeft);
    controlsDxBox.appendChild(controlsRight);
    
    mainContainer.appendChild(sideBar);
    mainContainer.appendChild(boardDiv);
    sideBar.appendChild(scoreBoard);
    sideBar.appendChild(levelBoard);
    sideBar.appendChild(livesBoard);
    sideBar.appendChild(exitBtn);

    setTimeout(() => {
        sideBar.classList.add('left-animation');
        boardDiv.classList.add('right-animation');
    }, 100)

    exitBtn.addEventListener('click', () => {
        sideBar.classList.remove('left-animation');
        boardDiv.classList.remove('right-animation');
        document.querySelector('#controls').innerHTML = '';

        setTimeout(() => {
            mainContainer.classList.remove('horizontal');
            mainContainer.removeChild(sideBar);
            mainContainer.removeChild(boardDiv);
            mainMenu('-1000px', '1000px');
        }, 1000)
    })

    levelGenerator(0, 3, 0, boardDiv, scoreBoard, levelBoard);

}


const mainContainer = document.querySelector('main')