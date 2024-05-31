import { useGame, registry } from 'titanium';

import './keyBinds';

import { useAppCanvas } from './camera/appCanvas';
import { useGameCamera } from './camera/gameCamera';
import { useUiCamera } from './camera/uiCamera';

import { usePlayer } from './player/player';

import { useLobby } from './level/lobby';
import { useCameraProxy } from './camera/cameraProxy';
import { useDebugMenu } from './debug/debugMenu';

const game = useGame({});

const appCanvas = useAppCanvas();

export const gameCamera = useGameCamera({canvas: appCanvas});
export const uiCamera = useUiCamera({canvas: appCanvas});

export const debugColliderCameraProxy = useCameraProxy({ drawCamera: gameCamera, drawColour: 'cornflowerBlue' });
export const debugAgitatorCameraProxy = useCameraProxy({ drawCamera: gameCamera, drawColour: 'gold' });
export const debugProfilerCameraProxy = useCameraProxy({ drawCamera: uiCamera, drawColour: 'greenYellow' });

gameCamera.setScale(2);
uiCamera.setScale(1.5);

registry.register(appCanvas);
registry.register(gameCamera);
registry.register(uiCamera);

registry.register(useDebugMenu());
debugProfilerCameraProxy.setEnabled(true);

registry.register(useLobby());

registry.register(usePlayer());

console.log(registry.stringify());

export const run = () => {
    window.addEventListener('load', () => game.start());
}