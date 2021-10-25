import "./index.sass";

import { html, o } from "sinuous";

function setVolume(button, volume, withInput) {
    if(withInput) {
        button.input.value = volume * 100;
        button.audio.volume = volume;
    } else {
        button.audio.volume = volume;
    }
}

function activateButton(id) {
    let button = audiosMap[id];
    if(button.classList.contains("active")) {
        button.classList.remove("active");
        button.audio.pause();
        if(activeButtons.indexOf(id) !== -1) activeButtons.splice(activeButtons.indexOf(id), 1);
    } else {
        button.classList.add("active");
        button.audio.currentTime = 0;
        button.audio.play();
        activeButtons.push(id);
    }
}

export const SoundTile = (props, onClick, onChange) => {
    let iconButton = html`<img src=${props.icon}/>`;
    let inputVolume = html`<input type="range"/>`;

    let element = html`
        <div class="sound-tile">
            ${iconButton}
            ${inputVolume}
        </div>
    `;

    element.audio = new Audio(props.audio);
    element.audio.loop = true;
    element.audio.volume = 0.5;
    element.input = inputVolume;
    element.active = false;

    element.activate = () => {
        if(element.active) {
            element.classList.remove("active");
            element.audio.pause();
            element.audio.currentTime = 0;
            element.active = false;
        } else {
            element.classList.add("active");
            element.audio.play();
            element.active = true;
        }
    }

    element.setVolume = (value, withInput) => {
        if(withInput) {
            element.input.value = value;
            element.audio.volume = value / 100;
        } else {
            element.audio.volume = value / 100;
        }
    }

    iconButton.addEventListener("click", () => onClick(props.id));
    inputVolume.addEventListener("change", () => element.setVolume(inputVolume.value));

    return element;
}