import { randomInt } from "./utils.js";

const logs = {
    start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
    end: [
        'Результат удара [playerWins]: [playerLose] - труп',
        '[playerLose] погиб от удара бойца [playerWins]',
        'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
    ],
    hit: [
        '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
        '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
        '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
        '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
        '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
        '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
        '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
        '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
        '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
        '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
        '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
        '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
        '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
        '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
        '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
        '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
        '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
        '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
    ],
    defence: [
        '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
        '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
        '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
        '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
        '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
        '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
        '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
    ],
    draw: 'Ничья - это тоже победа!'
};


const generateLogs = ($chat, type, { player1, player2, hit }) => {
    const lines = logs[type];
    const tmpl = Array.isArray(lines) ? lines[randomInt(0, lines.length - 1)] : `${lines}`;
    const now = new Date();
    const nowTime = now.toTimeString().substr(0, 5);

    const msgBuilder = {
        text: '',
        add: function (text) {
            return { ...this, text: `${this.text}${text}` };
        },

        replace: function (tmpl, params) {
            let text = tmpl;
            for (let [key, val] of Object.entries(params ?? {})) {
                text = text.replaceAll(`[${key}]`, val);
            }
            return this.add(text);
        },

        addTime: function () { return this.add(`${nowTime} - `) },

        build: function (type) {
            switch (type) {
                case 'start':
                    return this.replace(tmpl, { time: nowTime, player1: player1.name, player2: player2.name });

                case 'hit':
                    return this
                        .addTime()
                        .replace(tmpl, {
                            playerKick: player1.name,
                            playerDefence: player2.name
                        })
                        .replace(' -[hit] [[hp]/100]', {
                            hit,
                            hp: player2.hp
                        })

                case 'defence':
                    return this
                        .addTime()
                        .replace(tmpl, {
                            playerDefence: player2.name,
                            playerKick: player1.name
                        });

                case 'end':
                    return this.replace(tmpl, { playerWins: player1.name, playerLose: player2.name });

                case 'draw':
                    return this.replace(tmpl);

                default:
                    return null;
            }
        }
    };

    const msg = msgBuilder.build(type);

    if (msg) $chat.insertAdjacentHTML("afterbegin", `<p>${msg.text}</p>`);
}

const getGenerateLogs = ($chat) => (...args) => generateLogs($chat, ...args);
export default getGenerateLogs;
