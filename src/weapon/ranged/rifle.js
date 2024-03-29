import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    useFiniteStateMachine,
    input,
    lerp
} from 'titanium';

import { binds } from '../../keyBinds';
import { movementStates } from '../../player/playerMovementState';

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
        sliceHeight: 16,
        runs: [
            useSpriteSheetRun({name: 'rest'}),
            useSpriteSheetRun({name: 'fire', x: 1, spriteCount: 3, fps: 24})
        ]
    });

    let sprite = null;
    const spriteOptions = useSpriteOptions({
        offsetX: -16
    });

    const setSprite = name => {

        if (sprite?.name === name) return;

        sprite = sprites[name]({
            position,
            camera: drawCamera,
            options: spriteOptions
        });
    };
    setSprite('rest');
    
    const fire = () => {

        if (
            input.isDown(binds.weaponAttack) &&
            stateMachine.getState() === states.rest &&
            movementState.getState() !== movementStates.dodge
        ) {
            stateMachine.setState(states.fire);
            //TODO: shoot bullets :)
        }
    };

    const animate = () => {

        spriteOptions.setFlip(directionState.isLeft());

        switch(stateMachine.getState()) {
            case states.rest:
                setSprite('rest');
                break;
            case states.fire:
                setSprite('fire');
                sprite.registerFrameEvent(2, () => stateMachine.setState(states.rest))
                break;
        }

        if (movementState.getState() === movementStates.dodge) {

            spriteOptions.setOpacity(0);
            return;
        }
        spriteOptions.setOpacity(1);

        const rotation = position.findAngleBetweenPosition(aimPosition) 
            - 180 * Number(directionState.isLeft());
        spriteOptions.setRotation(rotation);
    };

    const update = () => {
        fire();
        animate();
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