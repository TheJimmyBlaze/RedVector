import { useRegistry, setRegistry, usePerformanceDisplay } from 'titanium';
import { useLobby } from '../level/lobby';
import { usePlayer } from '../player/player';

import { 
    uiCanvas, 
    gameCamera, 
    uiCamera, 
    profiler
} from '../globals';

export const useGameView = () => {

    const initialize = () => {

        const registry = useRegistry();
        setRegistry(registry);
        
        registry.register(uiCanvas); 
        registry.register(gameCamera);
        registry.register(uiCamera);

        gameCamera.setZoom(1.2);
        
        registry.register(profiler);
        registry.register(usePerformanceDisplay({
            profiler,
            drawCamera: uiCamera
        }));
        
        registry.register(useLobby());
        registry.register(usePlayer());
    };

    return {
        initialize
    };
};