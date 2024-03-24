import {
    useSpriteSheet,
    useSpriteSheetRun
} from 'titanium';

import { movementStates } from './playerMovementState';

export const usePlayerAnimator = ({
    playerPosition,
    playerMotion,
    playerDirectionState,
    playerMovementState,
    drawCamera
}) => {

    const isMovingBackwards = () => (
        playerDirectionState.isLeft() && playerMotion.getMotion().velocityX > 0 ||
        playerDirectionState.isRight() && playerMotion.getMotion().velocityX < 0
    );

    let previousDirection = playerDirectionState.getState();
    let previousMovement = playerMovementState.getState();
    let previousBackwards = isMovingBackwards();
    
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
    const setSprite = name => {

        sprite = sprites[name]({
            position: playerPosition,
            camera: drawCamera,
            options: {
                reverse: isMovingBackwards(),
                flip: playerDirectionState.isLeft()
            }
        })
    };
    setSprite('idle');
    
    const update = () => {

        const playerDirection = playerDirectionState.getState();
        const playerMovement = playerMovementState.getState();

        if (
            previousDirection === playerDirection &&
            previousMovement === playerMovement &&
            previousBackwards === isMovingBackwards()
        ) return;

        previousDirection = playerDirection;
        previousMovement = playerMovement;
        previousBackwards = isMovingBackwards();

        switch(playerMovementState.getState()) {
            case movementStates.idle:
                setSprite('idle');
                break;
            case movementStates.walk:
                setSprite('walk');
                break;
            case movementStates.run:
                setSprite('run');
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