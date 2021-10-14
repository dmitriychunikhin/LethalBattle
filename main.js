

const scorpion = {
    name: "Scorpion",
    hp: 50,
    img: "http://reactmarathon-api.herokuapp.com/assets/scorpion.gif",
    weapon: ["hook"],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const subzero = {
    name: "Sub-Zero",
    hp: 70,
    img: "http://reactmarathon-api.herokuapp.com/assets/subzero.gif",
    weapon: ["ice"],
    attack: function () {
        console.log(this.name + 'Fight...');
    }
}

const arenas = document.querySelector(".arenas");
arenas.appendChild(createPlayer("player1", scorpion));
arenas.appendChild(createPlayer("player2", subzero));


function createPlayer(className, player) {
    const root = document.createElement("div");
    root.classList.add(className);

    const pbar = root.appendChild(document.createElement("div"));
    pbar.classList.add("progressbar");

    const life = pbar.appendChild(document.createElement("div"));
    life.classList.add("life");
    life.style.width = `${player.hp}%`;

    const name = pbar.appendChild(document.createElement("div"));
    name.classList.add("name");
    name.innerText = player.name;

    const character = root.appendChild(document.createElement("div"));
    character.classList.add("character");

    const charImg = character.appendChild(document.createElement("img"));
    charImg.src = player.img;

    return root;

}