import { createElement } from "./utils.js";

export const createReloadButton = () => {
    const $root = createElement("div", "reloadWrap");
    const $btn = $root.appendChild(createElement("button", "button"));
    $btn.innerText = "Restart";
    return {$root, $btn};
}

export const createWinnerTitle = (winnerPlayer) => {
    const $title = createElement("div", "loseTitle");
    $title.innerText = winnerPlayer ? `${winnerPlayer.name} wins` : "draw";
    return $title;
}