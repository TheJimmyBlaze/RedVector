import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    useFiniteStateMachine,
    lerp
} from 'titanium';

import { movementStates } from '../../../player/playerMovementState';

export const useRifle = ({
    position,
    aimPosition,
    directionState,
    movementState,
    drawCamera
}) => {

    const states = {
        rest: 'weapon.rifle.state.rest',
        fire: 'weapon.rifle.state.fire'
    };

    const stateMachine = useFiniteStateMachine({
        initialState: states.rest
    });
    
    const sprites = useSpriteSheet({
        imagePath: 'sprites/weapon_ranged_rifle_sheet.png',
        sliceWidth: 48,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun({name: 'rest'}),
            useSpriteSheetRun({name: 'fire', x: 1, spriteCount: 3, fps: 12})
        ]
    });

    let sprite = null;
    const spriteOptions = useSpriteOptions({
        offsetX: -16
    });

    const setSprite = name => {
        sprite = sprites[name]({
            position,
            camera: drawCamera,
            options: spriteOptions
        });
    };
    setSprite('rest');

    const update = () => {

        spriteOptions.setFlip(directionState.isLeft());

        if (movementState.getState() === movementStates.dodge) {

            spriteOptions.setOpacity(lerp(spriteOptions.getOpacity(), 0, 0.0000001));
            return;
        }
        spriteOptions.setOpacity(lerp(spriteOptions.getOpacity(), 1, 0.0000001));

        const rotation = position.findAngleBetweenPosition(aimPosition) 
            - 180 * Number(directionState.isLeft());
        spriteOptions.setRotation(rotation);
    };

    const draw = () => {
        sprite?.actions.draw();
    };

    return {
        actions: {
            update,
            draw
        }
    };
};