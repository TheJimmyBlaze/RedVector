import {
    useSpriteSheet,
    useSpriteSheetRun
} from 'titanium';

export const usePlayerAnimator = ({
    playerPosition,
    playerStateMachine,
    drawCamera
}) => {
    
    const sprites = useSpriteSheet({
        imagePath: 'sprites/character_sheet.png',
        sliceWidth: 32,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun({name: 'idleRight'}),
            useSpriteSheetRun({name: 'idleLeft', y: 1}),
            useSpriteSheetRun({name: 'runRight', y: 2, spriteCount: 8, fps: 12}),
            useSpriteSheetRun({name: 'runLeft', y: 3, spriteCount: 8, fps: 12})
        ]
    });

    let sprite = sprites.idleRight({
        position: playerPosition,
        camera: drawCamera
    });
    
    const update = () => {

    };

    const draw = () => {
        sprite.actions.draw();
    };

    return {
        actions: {
            update,
            draw
        }
    };
};