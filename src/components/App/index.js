import "./index.sass";

import { html, o } from "sinuous";
import { map } from "sinuous/map"
import { Controls } from "../Controls";
import { SoundTile } from "../SoundTile";
import { Preset } from "../Preset";

let soundTilesMap = {};
let activePreset = undefined;

const onNextClick = (audios, preset) => {
    clearSoundTiles();
    if(preset.random) {
        let index = Math.floor(Math.random() * (audios.length - 1));
        audios[index].forEach(audio => {
            soundTilesMap[audio.id].activate();
            soundTilesMap[audio.id].setVolume(audio.volume, true);
        })
    } else {
        if(preset.currentIndex + 1 > audios.length - 1) {
            preset.currentIndex = 0;
        } else {
            preset.currentIndex++;
        }
        audios[preset.currentIndex].forEach(audio => {
            soundTilesMap[audio.id].activate();
            soundTilesMap[audio.id].setVolume(audio.volume, true);
        })
    }
}

const onPresetClick = (audios, preset) => {
    clearSoundTiles();
    if(preset.random) {
        if(preset.active) {
            preset.classList.remove("active");
            preset.active = false;
            activePreset = undefined;
        } else {
            if(activePreset) {
                activePreset.classList.remove("active");
                activePreset.active = false;
            }
            let index = Math.floor(Math.random() * (audios.length - 1));
            audios[index].forEach(audio => {
                soundTilesMap[audio.id].activate();
                soundTilesMap[audio.id].setVolume(audio.volume, true);
            })
            preset.classList.add("active");
            preset.active = true;
            activePreset = preset;
        }
    } else {
        if(preset.active) {
            preset.classList.remove("active");
            preset.active = false;
            activePreset = undefined;
        } else {
            if(activePreset) {
                activePreset.classList.remove("active");
                activePreset.active = false;
            }
            audios[0].forEach(audio => {
                soundTilesMap[audio.id].activate();
                soundTilesMap[audio.id].setVolume(audio.volume, true);
            })
            preset.currentIndex = 0;
            preset.classList.add("active");
            preset.active = true;
            activePreset = preset;
        }
    }
};

const onSoundTileClick = id => {
    soundTilesMap[id].activate();
}
const onChange = (id, value) => {
    soundTilesMap[id].setVolume(value, true);
};

const clearSoundTiles = (all) => {
    if(all && activePreset) {
        activePreset.classList.remove("active");
        activePreset.active = false;
        activePreset = undefined;
    }
    for(let key in soundTilesMap) {
        if(soundTilesMap[key].active) {
            soundTilesMap[key].activate();
        }
    }
};

export const App = props => {
    let presetsPlace = html`<div class="presets tab"></div>`;
    let savedPlace = html`<div class="saved tab"></div>`;
    let soundTiles = o([]);


    let controls = Controls({
        presets: presetsPlace,
        saved: savedPlace,
        save: console.log,
        clear: clearSoundTiles
    });

    let soundTilesPlace = html`
        <div class="sound-tiles">
            ${map(soundTiles, soundTile => soundTile)}
        </div>
    `;

    let logo = html`<img class="logo" src="./assets/img/Logo.svg"/>`
    
    let element = html`
        <div class="app">
            ${logo}
            ${controls}
            ${presetsPlace}
            ${savedPlace}
            ${soundTilesPlace}
        </div>
    `;

    element.addPreset = item => {
        let preset = Preset(item, onPresetClick, onNextClick);
        presetsPlace.append(preset);
    };
    
    element.addPresets = items => {
        items.forEach(item => element.addPreset(item));
    }

    element.addSoundTile = item => {
        let soundTile = SoundTile(item, onSoundTileClick, onChange);
        soundTilesMap[item.id] = soundTile;

        let list = soundTiles();
        list.push(soundTile);
        soundTiles(list);
        soundTilesPlace.append(soundTile);
    };

    element.addSoundTiles = items => {
        items.forEach(item => element.addSoundTile(item));
    }

    return element;
}