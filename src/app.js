import { usePerformanceProfiler, useGame, registry } from 'titanium';

import { useAppCanvas } from './entity/graphics/appCanvas';
import { useGameCamera } from './entity/graphics/gameCamera';
import { useUiCamera } from './entity/graphics/uiCamera';

const game = useGame({});

const appCanvas = useAppCanvas();
const gameCamera = useGameCamera({canvas: appCanvas});
const uiCamera = useUiCamera({canvas: appCanvas});
registry.register(appCanvas);
registry.register(gameCamera);
registry.register(uiCamera);

const performanceProfiler = usePerformanceProfiler({drawCamera: uiCamera.components.uiCamera});
registry.register(performanceProfiler);

console.log(registry.stringify());

export const run = () => {
    window.addEventListener('load', () => game.start());
}