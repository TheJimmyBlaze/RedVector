import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    lerp
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
            useSpriteSheetRun({name: 'run', y: 2, spriteCount: 8, fps: 12}),
            useSpriteSheetRun({name: 'dodge', y: 3}),
            useSpriteSheetRun({name: 'recover', x: 4, y: 3, spriteCount: 4, fps: 12})
        ]
    });

    let sprite = null;
    const spriteOptions = useSpriteOptions({
        offsetY: 4
    });
    
    const setSprite = name => {

        sprite = sprites[name]({
            position: playerPosition,
            camera: drawCamera,
            options: spriteOptions
        });
    };
    setSprite('idle');
    
    const update = () => {

        const playerDirection = playerDirectionState.getState();
        const playerMovement = playerMovementState.getState();

        if (playerMovement === movementStates.dodge) {

            const diveRotation = 120 * (playerMotion.getMotion().velocityX >= 0 || -1);
            spriteOptions.setRotation(lerp(spriteOptions.getRotation(), spriteOptions.getRotation() + diveRotation, 0.0001));
        } else {
            spriteOptions.setRotation(0);
        }

        if (
            previousDirection === playerDirection &&
            previousMovement === playerMovement &&
            previousBackwards === isMovingBackwards()
        ) return;

        previousDirection = playerDirection;
        previousMovement = playerMovement;
        previousBackwards = isMovingBackwards();

        spriteOptions.setFlip(playerDirectionState.isLeft());

        switch(playerMovement) {
            case movementStates.idle:
                setSprite('idle');
                break;
            case movementStates.walk:
                setSprite('walk');
                spriteOptions.setReverse(isMovingBackwards());
                break;
            case movementStates.run:
                setSprite('run');
                spriteOptions.setReverse(isMovingBackwards());
                break;
            case movementStates.dodge:
                setSprite('dodge');
                break;
            case movementStates.recover:
                setSprite('recover');
                sprite.registerFrameEvent(3, () => playerMovementState.setState(movementStates.idle));
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