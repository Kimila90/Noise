import "./index.sass";

import { content as soundTiles } from "./contents/sound-tile";
import { content as presets } from "./contents/presets";
import { App } from "./components/App";

const app = App();

app.addPresets(presets);
app.addSoundTiles(soundTiles);

document.body.append(app);