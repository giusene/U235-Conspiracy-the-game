import { hero } from './hero.js';

export const levelGenerator = (level, lives, score, boardDiv, scoreBoard, levelBoard, board = []) => {
    if (board.length === 0) {
        for (let lines of levels[level]) {
        let newLine = [];
        for (let box of lines) {
            let objectBox;
            switch (box) {
                case 0:
                    objectBox = {
                        block: false,
                        dot: true,
                        fruit: false,
                        cssclass: 'dot'
                    }
                break;
                case 1:
                    objectBox = {
                        block: true,
                        dot: false,
                        fruit: false,
                        cssclass: 'block-true'
                    }
                break;
                case 2:
                    objectBox = {
                        block: true,
                        dot: false,
                        fruit: false,
                        cssclass: 'bridge'
                    }
                break;
                case 3:
                    objectBox = {
                        block: true,
                        dot: false,
                        fruit: false,
                        cssclass: 'liquid'
                    }
                break;
                case 4:
                    objectBox = {
                        block: true,
                        dot: false,
                        fruit: false,
                        cssclass: 'bin'
                    }
                break;
                case 5:
                    objectBox = {
                        block: true,
                        dot: false,
                        fruit: false,
                        cssclass: 'wall-little'
                    }
                break;
                case 6:
                    objectBox = {
                        block: true,
                        dot: false,
                        fruit: false,
                        cssclass: 'computer'
                    }
                break;
            }
            newLine.push(objectBox);
        }
        board.push(newLine);
    }

    board[1][1] = {
        block: false,
        dot: false,
        fruit: false,
        cssclass: 'dot'
    }
}

    boardDiv.innerHTML = '';

    let zIndexForLines = 1;
    for (let i = 0; i < board.length; i++) {
        let zIndexForBlock = 30;
        zIndexForLines++
        for (let ii = 0; ii < board[0].length; ii++) {
            zIndexForBlock--
            let dotDiv = document.createElement('div');
            dotDiv.classList.add('dot');
            dotDiv.setAttribute('id', `${[i] + '-' + [ii]}`);
            if (board[i][ii].dot) {
                dotDiv.classList.add('dot-true');
            }
            if (board[i][ii].block) {
                dotDiv.classList.add(board[i][ii].cssclass);
                dotDiv.style.zIndex = parseInt('' + zIndexForLines + zIndexForBlock);
            }
            boardDiv.appendChild(dotDiv);

        }
    }
    hero(boardDiv, board, score, scoreBoard, level, levelBoard, lives);
}




const levels = [
    [
        [3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3],
        [3, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 3, 3, 1, 4, 6, 1, 3],
        [3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 4, 6, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 3, 3, 1, 1, 1, 1, 3],
        [3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
    ],[
        [3, 3, 3, 3, 1, 1, 1, 1, 3, 3, 3, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 0, 1, 1, 0, 2, 2, 0, 1, 1, 0, 3],
        [3, 0, 1, 1, 0, 3, 3, 0, 4, 6, 0, 3],
        [3, 0, 0, 0, 0, 3, 3, 0, 0, 0, 0, 3],
        [3, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 3],
        [3, 0, 4, 6, 1, 1, 0, 0, 1, 1, 0, 3],
        [3, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 3],
        [3, 0, 1, 1, 0, 3, 3, 0, 1, 1, 0, 3],
        [3, 0, 1, 1, 0, 3, 3, 0, 1, 1, 0, 3],
        [3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [3, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3]
    ],
    [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ]
]