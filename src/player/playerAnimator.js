import {
    useSpriteSheet,
    useSpriteSheetRun
} from 'titanium';

import { playerStates } from './playerStateMachine';

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
            useSpriteSheetRun({name: 'idle'}),
            useSpriteSheetRun({name: 'walk', y: 1, spriteCount: 8, fps: 12}),
            useSpriteSheetRun({name: 'run', y: 2, spriteCount: 8, fps: 12})
        ]
    });

    let sprite = null;
    const setSprite = ({
        name, 
        flip = false,
        reverse = false
    }) => {

        if (name === sprite?.name) return;

        sprite = sprites[name]({
            position: playerPosition,
            camera: drawCamera,
            options: {
                reverse
            }
        })
    };
    setSprite({name: 'idle'});
    
    const update = () => {
        switch(playerStateMachine.getState()) {
            case playerStates.idle.right:
                setSprite({name: 'idle'});
                break;
            case playerStates.walk.right:
                setSprite({name: 'walk'});
                break;
            case playerStates.walk.rightBackwards:
                setSprite({name: 'walk', reverse: true});
                break;
            case playerStates.run.right:
                setSprite({name: 'run'});
                break;
            case playerStates.run.rightBackwards:
                setSprite({name: 'run', reverse: true});
                break;
        }
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