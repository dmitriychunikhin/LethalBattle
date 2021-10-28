import { createElement } from "./utils.js";

export class Player {
    constructor({ player, hp = 100, character: { name, img, weapon }, attack }) {
        this.player = player;
        this.name = name;
        this.hp = hp;
        this.img = img;
        this.weapon = weapon;
        this.attack = attack;

        this.createPlayerDOM();

    }

    createPlayerDOM = () => {
        const { player, hp, name, img } = this;

        const $player = createElement("div", `player${player}`);

        const $pbar = $player.appendChild(createElement("div", "progressbar"));

        const $life = $pbar.appendChild(createElement("div", "life"));
        $life.style.width = `${hp}%`;

        const $name = $pbar.appendChild(createElement("div", "name"));
        $name.innerText = name;

        const $character = $player.appendChild(createElement("div", "character"));

        const $charImg = $character.appendChild(createElement("img"));
        $charImg.src = img;

        this.$player = $player;
        this.$life = $life;
    }


    elHP = () => {
        return this.$life;
    }

    renderHP = () => {
        this.elHP().style.width = `${this.hp}%`;
    }

    changeHP = (amount) => {
        this.hp += amount;
        this.hp = this.hp < 0 ? 0 : this.hp;
    }

    acceptAttack = (hit) => {
        this.changeHP(-hit);
        this.renderHP();
    }

}

export const characters = {
    'Scorpion': {
        name: "Scorpion",
        img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
        weapon: ["hook"]
    },
    'Sub-Zero': {
        name: "Sub-Zero",
        img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
        weapon: ["ice"]
    }
}

