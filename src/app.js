import { performanceProfiler, registry, game } from 'titanium';

import { appCanvas } from './entity/graphics/appCanvas';
import { gameCamera, gameCamera } from './entity/graphics/gameCamera';
import { uiCamera } from './entity/graphics/uiCamera';

const game = game();

const appCanvas = appCanvas();
const gameCamera = gameCamera({canvas: appCanvas});
const uiCamera = gameCamera({canvas: appCanvas});
registry.register(appCanvas);
registry.register(gameCamera);
registry.register(uiCamera);

const performanceProfiler = performanceProfiler();
registry.register(performanceProfiler);

console.log(registry.stringify());

export const run = () => {
    window.addEventListener('load', () => game.start());
}