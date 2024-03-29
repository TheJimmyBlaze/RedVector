import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    useFiniteStateMachine,
    input
} from 'titanium';

import { binds } from '../../keyBinds';
import { movementStates } from '../../player/playerMovementState';

export const useSword = ({
    position,
    aimPosition,
    directionState,
    movementState,
    drawCamera
}) => {

    const states = {
        rest: 'weapon.sword.state.rest',
        swing: 'weapon.sword.state.swing'
    };

    const stateMachine = useFiniteStateMachine({
        initialState: states.rest
    });

    const sprites = useSpriteSheet({
        imagePath: 'sprites/weapon_melee_sword_sheet.png',
        sliceWidth: 16,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun({name: 'sword'})
        ]
    });

    const spriteOptions = useSpriteOptions({
        offsetY: 12,
        offsetX: 4
    });

    const sprite = sprites.sword({
        position,
        camera: drawCamera,
        options: spriteOptions
    });

    const update = () => {

        spriteOptions.setFlip(directionState.isLeft());

        if (movementState.getState() === movementStates.dodge) {
            spriteOptions.setOpacity(0);
            return;
        }
        spriteOptions.setOpacity(1);
    
        const rotation = position.findAngleBetweenPosition(aimPosition) 
            - 90
            + 360 * Number(directionState.isLeft());
        spriteOptions.setRotation(rotation);
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