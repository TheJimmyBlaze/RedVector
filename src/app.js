import { usePerformanceProfiler, useGame, registry } from 'titanium';

import './keyBinds';

import { useAppCanvas } from './camera/appCanvas';
import { useGameCamera } from './camera/gameCamera';
import { useUiCamera } from './camera/uiCamera';

import { usePlayer } from './player/player';

import { useLobby } from './level/lobby';

const game = useGame({});

const appCanvas = useAppCanvas();
export const gameCamera = useGameCamera({canvas: appCanvas});
export const uiCamera = useUiCamera({canvas: appCanvas});

gameCamera.setScale(5);
uiCamera.setScale(1.5);

registry.register(appCanvas);
registry.register(gameCamera);
registry.register(uiCamera);

const performanceProfiler = usePerformanceProfiler({drawCamera: uiCamera});
registry.register(performanceProfiler);

registry.register(useLobby());

registry.register(usePlayer());

console.log(registry.stringify());

export const run = () => {
    window.addEventListener('load', () => game.start());
}