import { characters, Player } from './players.js';
import { attackUI, attackAI } from './attack.js';
import getGenerateLogs from './logs.js';
import { createReloadButton, createWinnerTitle } from './ui.js';

export class Game {
    constructor() {
        this.$arenas = document.querySelector(".arenas");
        this.$rndBtn = document.querySelector("button.button");
        this.$reloadBtn = createReloadButton();
        this.$playerAttackForm = document.querySelector(".arenas .control");
        this.$chat = document.querySelector(".chat");

        this.player1 = new Player({
            player: 1,
            character: characters['Scorpion'],
            attack: attackUI 
        });

        this.player2 = new Player({
            player: 2,
            character: characters['Sub-Zero'],
            attack: attackAI
        });

        this.generateLogs = getGenerateLogs(this.$chat);

    }

    start = () => {
        const { player1, player2 } = this;

        this.generateLogs('start', { player1, player2 });


        this.$arenas.appendChild(player1.$player);
        this.$arenas.appendChild(player2.$player);

        this.$reloadBtn.$btn.addEventListener("click", () => {
            window.location.reload();
        });

        this.$playerAttackForm.style.visibility = 'visible';

        this.$playerAttackForm.addEventListener("submit", (e) => {
            e.preventDefault();

            this.handleAttack(e.target);
        });
    }

    handleAttack = (form) => {
        const { player1, player2 } = this;

        const p1Resolve = player1.attack(form);
        const p2Resolve = player2.attack(form);

        if (p1Resolve.attack !== p2Resolve.defence) {
            player2.acceptAttack(p1Resolve.hit);
            this.generateLogs('hit', { player1, player2, hit: p1Resolve.hit });
        } else {
            this.generateLogs('defence', { player1, player2 });
        }

        if (p2Resolve.attack !== p1Resolve.defence) {
            player1.acceptAttack(p2Resolve.hit);
            this.generateLogs('hit', { player2: player1, player1: player2, hit: p2Resolve.hit });
        } else {
            this.generateLogs('defence', { player2: player1, player1: player2 });
        }


        this.trySetWinner();
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



