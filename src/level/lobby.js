import { useEntity, usePosition, useSpriteSheet, useSpriteSheetRun } from 'titanium';

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
                name: 'block'
            })
        ]
    }).block({
        position,
        camera: drawCamera
    });

    const entity = useEntity({
        components: {
            position,
            sprite
        }
    });

    return {
        ...entity
    };
};