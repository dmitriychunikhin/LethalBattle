import { createElement } from "./utils.js";

export const createReloadButton = () => {
    const $root = createElement("div", "reloadWrap");
    const $btn = $root.appendChild(createElement("button", "button"));
    $btn.innerText = "Restart";
    return {$root, $btn};
}


export const createPlayer = ({ player, hp, name, img }) => {
    const $player = createElement("div", `player${player}`);

    const $pbar = $player.appendChild(createElement("div", "progressbar"));

    const $life = $pbar.appendChild(createElement("div", "life"));
    $life.style.width = `${hp}%`;

    const $name = $pbar.appendChild(createElement("div", "name"));
    $name.innerText = name;

    const $character = $player.appendChild(createElement("div", "character"));

    const $charImg = $character.appendChild(createElement("img"));
    $charImg.src = img;

    return { $player, $life };
}

export const createWinnerTitle = (winnerPlayer) => {
    const $title = createElement("div", "loseTitle");
    $title.innerText = winnerPlayer ? `${winnerPlayer.name} wins` : "draw";
    return $title;
}