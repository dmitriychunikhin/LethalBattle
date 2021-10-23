document.body.appendChild(document.createElement("script")).src = "logTemplates.js";

const $arenas = document.querySelector(".arenas");
const $rndBtn = document.querySelector("button.button");
const [$reloadBtnRoot, $reloadBtn] = createReloadButton();
const $playerAttackForm = document.querySelector(".arenas .control");
const $chat = document.querySelector(".chat");

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["hook"],
    attack: attackUI,
    acceptAttack,
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
    attack: attackAI,
    acceptAttack,
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

function acceptAttack(hit) {
    this.changeHP(-hit);
    this.renderHP();
}

function attackUI(form) {
    const res = {
        attack: "",
        defence: "",
        hit: 0
    };

    for (let item of form) {
        if (item.name === "hit") {
            if (item.checked) {
                res.attack = item.value;
                res.hit = HIT[item.value] ?? 0;
            }
        }
        if (item.name === "defence") {
            if (item.checked) {
                res.defence = item.value;
            }
        }

        item.checked = false;
    }

    return res;
}

function attackAI() {
    const attack = ATTACK[randomInt(0, ATTACK.length - 1)];
    const defence = ATTACK[randomInt(0, ATTACK.length - 1)];
    return {
        attack,
        defence,
        hit: HIT[attack]
    }
}

function generateLogs(type, { player1, player2, hit }) {
    const lines = logs[type];
    const tmpl = Array.isArray(lines) ? lines[randomInt(0, lines.length - 1)] : `${lines}`;
    const now = new Date();
    const nowTime = now.toTimeString().substr(0, 5);

    const msgBuilder = {
        text: '',
        add: function (text) {
            return { ...this, text: `${this.text}${text}` };
        },

        replace: function (tmpl, params) {
            let text = tmpl;
            for (let [key, val] of Object.entries(params ?? {})) {
                text = text.replace(`[${key}]`, val);
            }
            return this.add(text);
        },

        addTime: function () { return this.add(`${nowTime} - `) },

        build: function (type) {
            switch (type) {
                case 'start':
                    return this.replace(tmpl, { time: nowTime, player1: player1.name, player2: player2.name });

                case 'hit':
                    return this
                        .addTime()
                        .replace(tmpl, {
                            playerKick: player1.name,
                            playerDefence: player2.name
                        })
                        .replace('[text] -[hit] [[hp]/100]', {
                            text: this.text,
                            hit,
                            hp: player2.hp
                        })

                case 'defence':
                    return this
                        .addTime()
                        .replace(tmpl, {
                            playerDefence: player2.name,
                            playerKick: player1.name
                        });

                case 'end':
                    return this.replace(tmpl, { playerWins: player1.name, playerLose: player2.name });

                case 'draw':
                    return this.replace(tmpl);

                default:
                    return null;
            }
        }
    };

    const msg = msgBuilder.build(type);

    if (msg) $chat.insertAdjacentHTML("afterbegin", `<p>${msg.text}</p>`);
}


window.onload = function () {

    generateLogs('start', { player1, player2 });

    $arenas.appendChild(createPlayer(player1));
    $arenas.appendChild(createPlayer(player2));

    $reloadBtn.addEventListener("click", function () {
        window.location.reload();
    });


    $playerAttackForm.style.visibility = 'visible';

    $playerAttackForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const p1Resolve = player1.attack(e.target);
        const p2Resolve = player2.attack(e.target);

        if (p1Resolve.attack !== p2Resolve.defence) {
            player2.acceptAttack(p1Resolve.hit);
            generateLogs('hit', { player1, player2, hit: p1Resolve.hit });
        } else {
            generateLogs('defence', { player1, player2 });
        }

        if (p2Resolve.attack !== p1Resolve.defence) {
            player1.acceptAttack(p2Resolve.hit);
            generateLogs('hit', { player2: player1, player1: player2, hit: p2Resolve.hit });
        } else {
            generateLogs('defence', { player2: player1, player1: player2 });
        }

        trySetWinner();

    });
}


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

    const [winner, loser] = player1.hp === player2.hp ? [null, null] : player1.hp > player2.hp ? [player1, player2] : [player2, player1];

    $rndBtn.disabled = true;

    const $title = $arenas.appendChild(createElement("div", "loseTitle"));
    $title.innerText = winner ? `${winner.name} wins` : "draw";
    $arenas.appendChild($title);

    document.querySelector(".arenas").appendChild($reloadBtnRoot);

    generateLogs(winner ? 'end' : 'draw', { player1: winner, player2: loser });

}
