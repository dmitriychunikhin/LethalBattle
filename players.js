export const player1 = {
    player: 1,
    name: "Scorpion",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["hook"],
    attack: null,
    acceptAttack,
    $: null,
    elHP,
    renderHP,
    changeHP
}

export const player2 = {
    player: 2,
    name: "Sub-Zero",
    hp: 100,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["ice"],
    attack: null,
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

