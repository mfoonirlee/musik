import RLU from "rlu"; //response layout util
import Sound from "./components/player";

const PLAY_DURATION = 250;

let C_MUSIC = ["C1", "D1", "E1", "F1", "G1", "A1", "B1", "C2"];
let C_SHARP_MUSIC = ["C#1", "D#1", "F1", "F#1", "G#1", "A#1", "C#2"];

let E_MUSIC = ["E1", "F#1", "G#1", "A2", "B2", "C#2", "D#2", "E2"];

let notationList = [
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1,
    4,
    6,
    1,
    4,
    6,
    1,
    4,
    6,
    2,
    4,
    6,
    2,
    3,
    5,
    2,
    3,
    6,
    1,
    3,
    6,
    7,
    2,
    5,
    7,
    1,
    3,
    6,
    3,
    6,
    1,
    3,
    6,
    1,
    3,
    6,
    1
];

let toneList = [-1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    0, -1, -1,
    0, -1, -1,
    0
];

function getMusic() {
    let res = [];
    for (let i = 0, len = notationList.length; i < len; i++) {
        let syllable = E_MUSIC[notationList[i]];
        if (toneList[i]) {
            syllable =
                syllable.slice(0, -1) +
                (parseInt(syllable.slice(-1)) + toneList[i]);
        }
        res.push(syllable);
    }
    console.log(res);
    return res;
}

let music = getMusic();
var _ins;
class BootLoader {
    constructor() {
        if (!_ins) {
            _ins = this;
        }
        return _ins;
    }

    static getInstance() {
        if (!_ins) {
            _ins = new BootLoader();
        }
        return _ins;
    }
    playSound(sound) {
        if (!this.isInPlay) {
            this.isInPlay = true;
            music[this.playIndex] && sound.play(music[this.playIndex]);
            console.log(music[this.playIndex]);
        } else {
            if (Date.now() - this.playTime > PLAY_DURATION) {
                this.isInPlay = false;
                this.playTime = Date.now();
                this.playIndex++;
                this.playIndex =
                    this.playIndex >= music.length ? 0 : this.playIndex;
            }
        }

        requestAnimationFrame(this.playSound.bind(this, sound));
    }
    async init() {
        RLU.init(375);
        let {
            dingSound,
            hornSound,
            keySound,
            pluckSound
        } = await Sound.initSounds();

        this.playIndex = 0;
        this.playTime = Date.now();
        this.isInPlay = false;

        // this.playSound(dingSound);
        this.playSound(hornSound);
        // this.playSound(keySound);
        // this.playSound(pluckSound);
    }
}

BootLoader.getInstance().init();