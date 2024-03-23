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
            useSpriteSheetRun({name: 'idleRight'}),
            useSpriteSheetRun({name: 'idleLeft', y: 1}),
            useSpriteSheetRun({name: 'runRight', y: 2, spriteCount: 8, fps: 12}),
            useSpriteSheetRun({name: 'runLeft', y: 3, spriteCount: 8, fps: 12})
        ]
    });

    let sprite = null;
    const setSprite = (spriteName, reverse = false) => {

        if (spriteName === sprite?.name) return;

        sprite = sprites[spriteName]({
            position: playerPosition,
            camera: drawCamera,
            options: {
                reverse
            }
        })
    };
    setSprite('idleRight');
    
    const update = () => {
        switch(playerStateMachine.getState()) {
            case playerStates.idle.right:
                setSprite('idleRight');
                break;
            case playerStates.walk.right:
                setSprite('runRight');
            case playerStates.walk.rightBackwards:
                setSprite('runRight', true);
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