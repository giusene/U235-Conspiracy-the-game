import { stageRender } from "./stage_render.js";

export const mainMenu = (titleStart, containerStart) => {
    const title = document.createElement('div');
    title.classList.add('title');
    title.setAttribute('id', 'title');
    title.style.top = titleStart;
    title.textContent = 'U-235 CONSPIRACY';
    
    const container = document.createElement('div');
    container.classList.add('container');
    container.setAttribute('id', 'container');
    container.style.top = containerStart;

    const playBtn = document.createElement('a');
    playBtn.classList.add('button');
    playBtn.setAttribute('id', 'play-btn');
    playBtn.textContent = 'GIOCA';

    const creditBtn = document.createElement('a');
    creditBtn.classList.add('button');
    creditBtn.setAttribute('id', 'credit-btn');
    creditBtn.textContent = 'CREDITS';

    const creditDiv = document.createElement('div');
    creditDiv.classList.add('credit');
    creditDiv.setAttribute('id', 'credit-div');
    creditDiv.textContent = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

    const creditBack = document.createElement('a');
    creditBack.classList.add('button');
    creditBack.setAttribute('id', 'credit-back');
    creditBack.textContent = 'Indietro';

    mainContainer.appendChild(title);
    mainContainer.appendChild(container);
    container.appendChild(playBtn);
    container.appendChild(creditBtn);
    container.appendChild(creditDiv);
    creditDiv.appendChild(creditBack);

    setTimeout(() => {
        title.style.top = '0px';
        container.style.top = '0px';
    }, 5)

    creditBtn.addEventListener('click', () => {
        creditDiv.style.top = '0px';
    });

    creditBack.addEventListener('click', () => {
        creditDiv.style.top = '1000px';
    });


    playBtn.addEventListener('click', () => {
        container.style.top = '1000px';
        title.style.top = '-1000px';

        setTimeout( () => {
            mainContainer.removeChild(container);
            mainContainer.removeChild(title);
            mainContainer.classList.add('horizontal')
            stageRender();
        }, 1000)

    });
}

const mainContainer = document.querySelector('main')