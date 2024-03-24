import {
    useSpriteSheet,
    useSpriteSheetRun
} from 'titanium';

import { directionStates } from './playerDirectionState';
import { movementStates } from './playerMovementState';

export const usePlayerAnimator = ({
    playerPosition,
    playerMotion,
    playerDirectionState,
    playerMovementState,
    drawCamera
}) => {

    let previousDirection = playerDirectionState.getState();
    let previousMovement = playerMovementState.getState();
    
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

    const isMovingBackwards = () => (
        playerDirectionState.isLeft() && playerMotion.getMotion().velocityX > 0 ||
        playerDirectionState.isRight() && playerMotion.getMotion().velocityX < 0
    );

    let sprite = null;
    const setSprite = ({
        name, 
        reverse = false
    }) => {

        sprite = sprites[name]({
            position: playerPosition,
            camera: drawCamera,
            options: {
                reverse: isMovingBackwards(),
                flip: playerDirectionState.isLeft()
            }
        })
    };
    setSprite({name: 'idle'});
    
    const update = () => {

        const playerDirection = playerDirectionState.getState();
        const playerMovement = playerMovementState.getState();

        if (
            previousDirection === playerDirection &&
            previousMovement === playerMovement
        ) return;

        previousDirection = playerDirection;
        previousMovement = playerMovement;

        switch(playerMovementState.getState()) {
            case movementStates.idle:
                setSprite({name: 'idle'});
                break;
            case movementStates.walk:
                setSprite({name: 'walk'});
                break;
            case movementStates.run:
                setSprite({name: 'run'});
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