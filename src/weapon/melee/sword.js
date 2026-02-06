import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    useFiniteStateMachine,
    input
} from 'titanium';

import { binds } from '../../keyBinds';
import { movementStates } from '../../player/playerMovementState';
import { images } from '../../globals';

export const useSword = ({
    position,
    aimPosition,
    directionState,
    movementState,
    drawCamera
}) => {

    const states = {
        right: 'weapon.sword.state.right',
        left: 'weapon.sword.state.left',
        forehandAnticipation: 'weapon.sword.state.forehand.anticipation',
        backhandAnticipation: 'weapon.sword.state.backhand.anticipation',
        forehand: 'weapon.sword.state.forehand',
        backhand: 'weapon.sword.state.backhand'
    };

    const stateMachine = useFiniteStateMachine({
        initialState: states.left
    });

    const sprites = useSpriteSheet({
        image: images.sword,
        sliceWidth: 64,
        sliceHeight: 48,
        runs: [
            useSpriteSheetRun({name: 'rest'}),
            useSpriteSheetRun({name: 'anticipation', x: 1, spriteCount: 2, fps: 12}),
            useSpriteSheetRun({name: 'swoosh', x: 2, spriteCount: 3, fps: 24})
        ]
    });

    let sprite = null;
    const spriteOptions = useSpriteOptions({
        offsetY: -16
    });

    const setSprite = name => {

        if (sprite?.name === name) return false;

        sprite = sprites[name]({
            position,
            camera: drawCamera,
            options: spriteOptions
        });
        return true;
    };
    setSprite('rest');

    const swing = () => {

        if (
            !input().wasPressed(binds.weaponAttack) ||
            movementState.getState() === movementStates.dodge
        ) return;

        if (stateMachine.getState() === states.right) {
            stateMachine.setState(states.forehandAnticipation);
        }
        if (stateMachine.getState() === states.left) {
            stateMachine.setState(states.backhandAnticipation);
        }
    };

    const animate = () => {

        switch(stateMachine.getState()) {
            case states.right:
                setSprite('rest');
                spriteOptions.setMirror(false);
                spriteOptions.setZIndex(-1 * directionState.isLeft());
                break;
            case states.left:
                setSprite('rest');
                spriteOptions.setMirror(true);
                spriteOptions.setZIndex(-1 * !directionState.isLeft());
                break;
            case states.forehandAnticipation:
                if (setSprite('anticipation')) {
                    sprite.registerFrameEvent(1, () => stateMachine.setState(states.forehand));
                }
                spriteOptions.setMirror(false);
                spriteOptions.setZIndex(-1 * directionState.isLeft());
                break;
            case states.backhandAnticipation:
                if (setSprite('anticipation')) {
                    sprite.registerFrameEvent(1, () => stateMachine.setState(states.backhand));
                }
                spriteOptions.setMirror(true);
                spriteOptions.setZIndex(-1 * !directionState.isLeft());
                break;
            case states.forehand:
                if (setSprite('swoosh')) {
                    sprite.registerFrameEvent(2, () => stateMachine.setState(states.left));
                }
                spriteOptions.setMirror(false);
                spriteOptions.setZIndex(-1 * !directionState.isLeft());
                break;
            case states.backhand:
                if (setSprite('swoosh')) {
                    sprite.registerFrameEvent(2, () => stateMachine.setState(states.right));
                }
                spriteOptions.setMirror(true);
                spriteOptions.setZIndex(-1 * directionState.isLeft());
                break;
        }

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

    const update = () => {
        swing();
        animate();
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