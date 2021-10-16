
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
    }
}

const player2 = {
    player: 2,
    name: "Sub-Zero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["ice"],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$rndBtn.addEventListener("click", function () {
    !winner && changeHP(player1);
    !winner && changeHP(player2);
});


function createElement(tagName, classNames) {
    const el = document.createElement(tagName);
    if (classNames) {
        el.classList.add(classNames);
    }
    return el;
}

function createPlayer(player) {
    const root = createElement("div", `player${player.player}`);

    const pbar = root.appendChild(createElement("div", "progressbar"));

    const life = pbar.appendChild(createElement("div", "life"));
    life.style.width = player.hp > 0 ? `${player.hp}%` : '0';

    const name = pbar.appendChild(createElement("div", "name"));
    name.innerText = player.name;

    const character = root.appendChild(createElement("div", "character"));

    const charImg = character.appendChild(createElement("img"));
    charImg.src = player.img;

    return root;
}

function changeHP(player) {
    player.hp -= Math.ceil((Math.random() || 0.05) * 20);
    const $life = document.querySelector(`.player${player.player} .life`);
    $life.style.width = player.hp > 0 ? `${player.hp}%` : '0';

    if (player.hp <= 0) {
        setWinner(player.player === 1 ? player2 : player1);
    }
}


function setWinner(player) {
    winner = player;
    $rndBtn.disabled = true;

    const $title = $arenas.appendChild(createElement("div", "loseTitle"));
    $title.innerText = `${player.name} wins`;
    $arenas.appendChild($title);

}