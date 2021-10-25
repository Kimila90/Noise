import "./index.sass";

import { html } from "sinuous";

export const Preset = (props, onClick, onNextClick) => {
    let random = props.random || false;
    let iconElement = html`<img src=${props.icon} />`;
    let nameElement = html`<p>${props.name}</p>`;
    let nextButton = html`<button>Next</button>`;

    let buttonPreset = html`
        <div>
            ${iconElement}
            ${nameElement}
        </div>
    `;

    let element = html`
        <div class="preset">
            ${buttonPreset}
            ${nextButton}
        </div>
    `;

    element.currentIndex = 0;
    element.active = false;
    element.random = random;

    buttonPreset.addEventListener("click", () => onClick(props.audios, element));
    nextButton.addEventListener("click", () => onNextClick(props.audios, element))

    return element;
}