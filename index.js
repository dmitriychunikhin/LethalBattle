import { createElement, randomInt } from "./utils.js";

const $parent = document.querySelector('.parent');
const $player1 = document.querySelector('.player1');
const $player2 = document.querySelector('.player2');


function createEmptyPlayerBlock() {
    const el = createElement('div', ['character', 'div11', 'disabled']);
    const img = createElement('img');
    img.src = 'http://reactmarathon-api.herokuapp.com/assets/mk/avatar/11.png';
    el.appendChild(img);
    $parent.appendChild(el);
}

async function init() {
    localStorage.removeItem('player1');
    localStorage.removeItem('player2');

    const players = await fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json());

    let imgSrc = null;
    createEmptyPlayerBlock();

    players.forEach(item => {
        const el = createElement('div', ['character', `div${item.id}`]);
        const img = createElement('img');

        el.addEventListener('mousemove', () => {
            if (localStorage.getItem('player1')) return;
            if (imgSrc === null) {
                imgSrc = item.img;
                const $img = createElement('img');
                $img.src = imgSrc;
                $player1.appendChild($img);
            }
        });

        el.addEventListener('mouseout', () => {
            if (localStorage.getItem('player1')) return;
            if (imgSrc) {
                imgSrc = null;
                $player1.innerHTML = '';
            }
        });

        el.addEventListener('click', async () => {
            if (localStorage.getItem('player1')) return;

            localStorage.setItem('player1', JSON.stringify(item));

            $player1.innerHTML = '';
            imgSrc = item.img;
            const $img = createElement('img');
            $img.src = imgSrc;
            $player1.appendChild($img);

            el.classList.add('active1');


            const p2ItemSel = async (count) => {
                let $prevItem = null;
                for (let i = 0; i <= count; i++) {
                    if ($prevItem) $prevItem.classList.remove('active2');
                    if (i === count) break;

                    const p2Item = players[randomInt(0, players.length - 1)];
                    const $p2Item = $parent.querySelector(`.div${p2Item.id}`);
                    $prevItem = $p2Item;

                    $p2Item.classList.add('active2');

                    $player2.innerHTML = '';
                    const $img = createElement('img');
                    $img.src = p2Item.img;
                    $player2.appendChild($img);

                    const timer = new Promise((resolve) => {
                        const timerId = setTimeout(() => {
                            clearTimeout(timerId);
                            resolve();
                        }, 300);
                    });
                    await timer;
                }

                const player2 = await (await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose')).json();

                const $p2Item = $parent.querySelector(`.div${player2.id}`);
                $p2Item.classList.add('active2');
                $player2.innerHTML = '';
                const $img = createElement('img');
                $img.src = player2.img;
                $player2.appendChild($img);

                return player2;

            }


            setTimeout(async () => {
                const player2 = await p2ItemSel(5);

                localStorage.setItem('player2', JSON.stringify(player2));

                setTimeout(() => { window.location.pathname = 'arenas.html' }, 1000);
            }, 1000);
        });

        img.src = item.avatar;
        img.alt = item.name;

        el.appendChild(img);
        $parent.appendChild(el);
    });
}

init();
