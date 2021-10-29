import { Player } from './players.js';
import getGenerateLogs from './logs.js';
import { createReloadButton, createWinnerTitle } from './ui.js';

export class Game {
    constructor() {
        this.$arenas = document.querySelector(".arenas");
        this.$rndBtn = document.querySelector("button.button");
        this.$reloadBtn = createReloadButton();
        this.$playerAttackForm = document.querySelector(".arenas .control");
        this.$chat = document.querySelector(".chat");

        this.player1 = null;
        this.player2 = null;

        this.generateLogs = getGenerateLogs(this.$chat);

    }

    start = async () => {

        const player1Char = JSON.parse(localStorage.getItem('player1') || 'null');
        const player2Char = JSON.parse(localStorage.getItem('player2') || 'null');

        localStorage.removeItem('player1');
        localStorage.removeItem('player2');

        if (!player1Char || !player2Char) {
            window.location.pathname = "/";
        }

        this.player1 = new Player({
            player: 1,
            character: player1Char
        });


        this.player2 = new Player({
            player: 2,
            character: player2Char
        });


        const { player1, player2 } = this;

        this.generateLogs('start', { player1, player2 });


        this.$arenas.appendChild(player1.$player);
        this.$arenas.appendChild(player2.$player);

        this.$reloadBtn.$btn.addEventListener("click", () => {
            window.location.reload();
        });

        this.$playerAttackForm.style.visibility = 'visible';

        this.$playerAttackForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            await this.handleAttack(e.target);
        });
    }

    handleAttack = async (form) => {
        const { player1, player2 } = this;

        const p1Attack = this.parseAttackForm(form);

        const fight = await (await fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
            method: 'POST',
            body: JSON.stringify(p1Attack)
        })).json()

        const { player1: p1Resolve, player2: p2Resolve } = fight;

        if (p1Resolve.hit !== p2Resolve.defence) {
            player2.acceptAttack(p1Resolve.value);
            this.generateLogs('hit', { player1, player2, hit: p1Resolve.value });
        } else {
            this.generateLogs('defence', { player1, player2 });
        }

        if (p2Resolve.hit !== p1Resolve.defence) {
            player1.acceptAttack(p2Resolve.value);
            this.generateLogs('hit', { player2: player1, player1: player2, hit: p2Resolve.value });
        } else {
            this.generateLogs('defence', { player2: player1, player1: player2 });
        }

        this.trySetWinner();
    }

    parseAttackForm = (form) => {
        const res = {
            hit: "",
            defence: ""
        };

        for (let item of form) {
            if (item.name === "hit") {
                if (item.checked) {
                    res.hit = item.value;
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



    trySetWinner = () => {
        const { player1, player2 } = this;

        if (player1.hp > 0 && player2.hp > 0) return;

        const [winner, loser] = player1.hp === player2.hp ? [null, null] : player1.hp > player2.hp ? [player1, player2] : [player2, player1];

        this.$rndBtn.disabled = true;

        this.$arenas.appendChild(createWinnerTitle(winner));

        document.querySelector(".arenas").appendChild(this.$reloadBtn.$root);

        this.generateLogs(winner ? 'end' : 'draw', { player1: winner, player2: loser });

    }

}



