
const $arenas = document.querySelector(".arenas");
const $rndBtn = document.querySelector("button.button");
let winner = null;

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["hook"],
    attack: function () {
        console.log(this.name + 'Fight...');
    },
    $: null
}

const player2 = {
    player: 2,
    name: "Sub-Zero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["ice"],
    attack: function () {
        console.log(this.name + 'Fight...');
    },
    $: null
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$rndBtn.addEventListener("click", function () {
    if (!winner) { changeHP(player1); trySetWinner(); }
    if (!winner) { changeHP(player2); trySetWinner(); }
});


function createElement(tagName, classNames) {
    const el = document.createElement(tagName);
    if (classNames) {
        el.classList.add(classNames);
    }
    return el;
}

function randomInt(min, max) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

function createPlayer(player) {
    const $player = createElement("div", `player${player.player}`);

    const $pbar = $player.appendChild(createElement("div", "progressbar"));

    const $life = $pbar.appendChild(createElement("div", "life"));
    $life.style.width = player.hp > 0 ? `${player.hp}%` : '0';

    const $name = $pbar.appendChild(createElement("div", "name"));
    $name.innerText = player.name;

    const $character = $player.appendChild(createElement("div", "character"));

    const $charImg = $character.appendChild(createElement("img"));
    $charImg.src = player.img;

    player.$ = { $player, $life };

    return $player;
}

function changeHP(player) {
    player.hp -= randomInt(1, 20);
    player.$.$life.style.width = player.hp > 0 ? `${player.hp}%` : '0';
}


function trySetWinner() {
    if (winner) return;
    if (player1.hp > 0 && player2.hp > 0 ) return;

    winner = player1.hp > player2.hp ? player1 : player2;

    $rndBtn.disabled = true;

    const $title = $arenas.appendChild(createElement("div", "loseTitle"));
    $title.innerText = `${winner.name} wins`;
    $arenas.appendChild($title);

}