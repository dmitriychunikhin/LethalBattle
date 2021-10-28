import { Game } from './game.js';
import { characters } from './players.js';

const game = new Game({
    p1Character: characters['Scorpion'],
    p1IsHuman: true,
    p2Character: characters['Sub-Zero'],
    p2IsHuman: false 
});

game.start();
