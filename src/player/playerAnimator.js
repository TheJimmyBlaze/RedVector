import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    lerp
} from 'titanium';

import { movementStates } from './playerMovementState';
import { images } from '../globals';

export const usePlayerAnimator = ({
    position,
    motion,
    playerDirectionState,
    playerMovementState,
    drawCamera
}) => {

    const isMovingBackwards = () => (
        playerDirectionState.isLeft() && motion.getMotion().velocityX > 0 ||
        playerDirectionState.isRight() && motion.getMotion().velocityX < 0
    );
    
    const sprites = useSpriteSheet({
        image: images.character,
        sliceWidth: 32,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun({name: 'idle', x: 7, y: 2}),
            useSpriteSheetRun({name: 'walk', spriteCount: 8, fps: 12}),
            useSpriteSheetRun({name: 'run', y: 1, spriteCount: 8, fps: 12}),
            useSpriteSheetRun({name: 'dodge', y: 2}),
            useSpriteSheetRun({name: 'recover', x: 4, y: 2, spriteCount: 4, fps: 12})
        ]
    });

    let sprite = null;
    const spriteOptions = useSpriteOptions({
        offsetY: 4
    });
    
    const setSprite = name => {

        if (sprite?.name === name) return;

        sprite = sprites[name]({
            position: position,
            camera: drawCamera,
            options: spriteOptions
        });
    };
    setSprite('idle');
    
    const update = () => {

        if (playerMovementState.getState() === movementStates.dodge) {

            const diveRotation = 120 * (motion.getMotion().velocityX >= 0 || -1);
            spriteOptions.setRotation(lerp(spriteOptions.getRotation(), spriteOptions.getRotation() + diveRotation, 0.0001));
        } else {
            spriteOptions.setRotation(0);
        }

        spriteOptions.setMirror(playerDirectionState.isLeft());

        switch(playerMovementState.getState()) {
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