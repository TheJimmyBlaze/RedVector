import { usePerformanceProfiler, useGame, registry } from 'titanium';

import './keyBinds';

import { useAppCanvas } from './camera/appCanvas';
import { useGameCamera } from './camera/gameCamera';
import { useUiCamera } from './camera/uiCamera';

import { usePlayer } from './player/player';

import { useInputTest } from './debug/inputTest';
import { useTestProp } from './debug/testProp';

const game = useGame({});

const appCanvas = useAppCanvas();
const gameCamera = useGameCamera({canvas: appCanvas});
const uiCamera = useUiCamera({canvas: appCanvas});
registry.register(appCanvas);
registry.register(gameCamera);
registry.register(uiCamera);

const performanceProfiler = usePerformanceProfiler({drawCamera: uiCamera.components.uiCamera});
registry.register(performanceProfiler);

registry.register(useTestProp({x: 0, y: 0, drawCamera: gameCamera.components.gameCamera}));
registry.register(useTestProp({x: -50, y: -50, drawCamera: gameCamera.components.gameCamera}));
registry.register(useTestProp({x: -100, y: -100, drawCamera: gameCamera.components.gameCamera}));
registry.register(useTestProp({x: 100, y: 100, drawCamera: gameCamera.components.gameCamera}));

// registry.register(useInputTest());
// registry.register(useInputTest());

console.log(registry.stringify());

export const run = () => {
    window.addEventListener('load', () => game.start());
}