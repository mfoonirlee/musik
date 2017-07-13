import { Howl } from "howler";

const soundMap = {
    DING: "./static/ding.ogg",
    HORN: "./static/horn.ogg",
    KEY: "./static/key.ogg",
    PLUCK: "./static/pluck.ogg"
};

let musicNoteLength = 36;

let musicNoteBasic = [
    "A#0",
    "A#1",
    "A#2",
    "A0",
    "A1",
    "A2",
    "B0",
    "B1",
    "B2",
    "C#0",
    "C#1",
    "C#2",
    "C0",
    "C1",
    "C2",
    "D#0",
    "D#1",
    "D#2",
    "D0",
    "D1",
    "D2",
    "E0",
    "E1",
    "E2",
    "F#0",
    "F#1",
    "F#2",
    "F0",
    "F1",
    "F2",
    "G#0",
    "G#1",
    "G#2",
    "G0",
    "G1",
    "G2"
];

function getMusicNoteArray() {
    let res = {};
    let noteStart = 0;
    let noteStep = 2100;
    let noteLength = 2000;

    for (let i = 0; i < musicNoteLength; i++) {
        res[musicNoteBasic[i]] = [noteStart, noteLength];
        noteStart += noteStep;
    }
    return res;
}

export default {
    initSounds: async() => {
        let res = {};

        res.dingSound = await new Promise((resolve, reject) => {
            let dingSound = new Howl({
                src: soundMap.DING,
                sprite: getMusicNoteArray(),
                onload: () => {
                    resolve(dingSound);
                }
            });
        });

        res.hornSound = await new Promise((resolve, reject) => {
            let hornSound = new Howl({
                src: soundMap.HORN,
                sprite: getMusicNoteArray(),
                onload: () => {
                    resolve(hornSound);
                }
            });
        });

        res.keySound = await new Promise((resolve, reject) => {
            let keySound = new Howl({
                src: soundMap.KEY,
                sprite: getMusicNoteArray(),
                onload: () => {
                    resolve(keySound);
                }
            });
        });

        res.pluckSound = await new Promise((resolve, reject) => {
            let pluckSound = new Howl({
                src: soundMap.PLUCK,
                sprite: getMusicNoteArray(),
                onload: () => {
                    resolve(pluckSound);
                }
            });
        });

        return res;
    },
    createSound: soundSource => {
        return new Howl({
            src: [soundMap[soundSource]],
            sprite: getMusicNoteArray()
        });
    }
};