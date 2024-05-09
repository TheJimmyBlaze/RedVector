import { 
    useEntity, 
    usePosition, 
    useSpriteSheet, 
    useSpriteSheetRun, 
    useSpriteOptions
 } from 'titanium';
import { useRectTerrainCollider } from './colliders/rectTerrainCollider';

export const useLobby = ({
    x, y,
    drawCamera
}) => {

    const position = usePosition({x, y});
    
    const sprite = useSpriteSheet({
        imagePath: 'sprites/level_lobby.png',
        sliceWidth: 1024,
        sliceHeight: 1024,
        runs: [
            useSpriteSheetRun({
                name: 'sprite'
            })
        ]
    }).sprite({
        position,
        camera: drawCamera,
        options: useSpriteOptions({
            zIndex: -1000
        })
    });

    const testCollider = useRectTerrainCollider({
        position: usePosition({x: 0, y: 100}),
        width: 64, height: 64,
        drawCamera
    });

    const entity = useEntity({
        components: {
            position,
            sprite,
            testCollider
        }
    });

    return {
        ...entity
    };
};