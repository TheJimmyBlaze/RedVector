import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions,
    useFiniteStateMachine
} from 'titanium';

export const useRifle = ({
    position,
    aimPosition,
    directionState,
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
        offsetX: -16,
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

        let rotationAngle = position.findAngleBetweenPosition(aimPosition) 
            - 180 * Number(directionState.isLeft());
        spriteOptions.setRotation(rotationAngle);
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