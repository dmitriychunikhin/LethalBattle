
const $arenas = document.querySelector(".arenas");
const $rndBtn = document.querySelector("button.button");
const [$reloadBtnRoot, $reloadBtn] = createReloadButton();
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
    $: null,
    elHP,
    renderHP,
    changeHP
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
    $: null,
    elHP,
    renderHP,
    changeHP
}

function elHP() {
    return this.$.$life;
}

function renderHP() {
    this.elHP().style.width = `${this.hp}%`;
}

function changeHP(amount) {
    this.hp += amount;
    this.hp = this.hp < 0 ? 0 : this.hp;
}

$arenas.appendChild(createPlayer(player1));
$arenas.appendChild(createPlayer(player2));

$rndBtn.addEventListener("click", function () {
    player1.changeHP(-randomInt(1, 20));
    player2.changeHP(-randomInt(1, 20));
    player1.renderHP();
    player2.renderHP();
    trySetWinner();
});

$reloadBtn.addEventListener("click", function () {
    window.location.reload();
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


function createReloadButton() {
    const $root = createElement("div", "reloadWrap");
    const $btn = $root.appendChild(createElement("button", "button"));
    $btn.innerText = "Restart";
    return [$root, $btn];
}



function createPlayer(player) {
    const $player = createElement("div", `player${player.player}`);

    const $pbar = $player.appendChild(createElement("div", "progressbar"));

    const $life = $pbar.appendChild(createElement("div", "life"));
    $life.style.width = `${player.hp}%`;

    const $name = $pbar.appendChild(createElement("div", "name"));
    $name.innerText = player.name;

    const $character = $player.appendChild(createElement("div", "character"));

    const $charImg = $character.appendChild(createElement("img"));
    $charImg.src = player.img;

    player.$ = { $player, $life };

    return $player;
}


function trySetWinner() {
    if (player1.hp > 0 && player2.hp > 0) return;

    winner = player1.hp === player2.hp ? null : player1.hp > player2.hp ? player1 : player2;

    $rndBtn.disabled = true;

    const $title = $arenas.appendChild(createElement("div", "loseTitle"));
    $title.innerText = winner ? `${winner.name} wins` : "draw";
    $arenas.appendChild($title);

    document.querySelector(".root .arenas .control").appendChild($reloadBtnRoot);

}
