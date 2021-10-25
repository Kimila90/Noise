import "./index.sass";

import { html } from "sinuous";

let activeTab = {
    tab: undefined,
    button: undefined
};

const activateTab = (tab, button) => {
    if(activeTab.tab && activeTab.button) {
        activeTab.tab.classList.remove("active");
        activeTab.button.classList.remove("active");
    }
    tab.classList.add("active");
    button.classList.add("active");
    activeTab.tab = tab;
    activeTab.button = button;
};

export const Controls = props => {
    let presetsButton = html`<button>Presets</button>`;
    let savedButton = html`<button>Saved</button>`;
    let saveButton = html`<button>Save</button>`;
    let clearButton = html`<button>Clear</button>`;

    presetsButton.addEventListener("click", () => {
        activateTab(props.presets, presetsButton);
    });

    savedButton.addEventListener("click", () => {
        activateTab(props.saved, savedButton);
    });

    saveButton.addEventListener("click", () => {
        props.save("save");
    });

    clearButton.addEventListener("click", () => {
        props.clear(true);
    });

    let leftSide = html`
        <div class="left-side">
            ${presetsButton}
            ${savedButton}
        </div>
    `;

    let rightSide = html`
        <div class="right-side">
            ${saveButton}
            ${clearButton}
        </div>
    `;

    let element = html`
        <div class="controls">
            ${leftSide}
            ${rightSide}
        </div>
    `;

    activateTab(props.presets, presetsButton);

    return element;
};