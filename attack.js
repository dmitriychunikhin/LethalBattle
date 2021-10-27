import { randomInt } from "./utils.js";

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

export const attackUI = (form) => {
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

export const attackAI = () => {
    const attack = ATTACK[randomInt(0, ATTACK.length - 1)];
    const defence = ATTACK[randomInt(0, ATTACK.length - 1)];
    return {
        attack,
        defence,
        hit: HIT[attack]
    }
}

