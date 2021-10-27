import { createElement } from "./utils.js";

export const createReloadButton = () => {
    const $root = createElement("div", "reloadWrap");
    const $btn = $root.appendChild(createElement("button", "button"));
    $btn.innerText = "Restart";
    return [$root, $btn];
}


export const createPlayer = (player) => {
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

export const createWinnerTitle = (winnerPlayer) => {
    const $title = createElement("div", "loseTitle");
    $title.innerText = winnerPlayer ? `${winnerPlayer.name} wins` : "draw";
    return $title;
}