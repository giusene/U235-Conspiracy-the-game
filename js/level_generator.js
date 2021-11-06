import { hero } from './hero.js';

export const levelGenerator = (level, lives, score, boardDiv, scoreBoard) => {
    const board = [];
    for (let lines of levels[level]) {
        let newLine = [];
        for (let box of lines) {
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

    board[1][1] = {
        block: false,
        dot: false,
        fruit: false
    }

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
                dotDiv.classList.add('block-true');
                dotDiv.style.zIndex = parseInt('' + zIndexForLines + zIndexForBlock);
            }
            boardDiv.appendChild(dotDiv);

        }
    }
    hero(boardDiv, board, score, scoreBoard, level);
}




const levels = [
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