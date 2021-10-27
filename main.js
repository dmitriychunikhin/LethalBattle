import {player1, player2} from './players.js';
import {attackUI, attackAI} from './attack.js';
import getGenerateLogs from './logs.js';
import { createPlayer, createReloadButton, createWinnerTitle } from './ui.js';

const $arenas = document.querySelector(".arenas");
const $rndBtn = document.querySelector("button.button");
const [$reloadBtnRoot, $reloadBtn] = createReloadButton();
const $playerAttackForm = document.querySelector(".arenas .control");
const $chat = document.querySelector(".chat");

player1.attack = attackUI;
player2.attack = attackAI;

const generateLogs = getGenerateLogs($chat);

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



function trySetWinner() {
    if (player1.hp > 0 && player2.hp > 0) return;

    const [winner, loser] = player1.hp === player2.hp ? [null, null] : player1.hp > player2.hp ? [player1, player2] : [player2, player1];

    $rndBtn.disabled = true;

    $arenas.appendChild(createWinnerTitle(winner));

    document.querySelector(".arenas").appendChild($reloadBtnRoot);

    generateLogs(winner ? 'end' : 'draw', { player1: winner, player2: loser });

}
