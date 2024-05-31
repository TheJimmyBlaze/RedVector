import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions
} from 'titanium';

export const useBulletAnimator = ({
    position,
    collider,
    direction,
    drawCamera
}) => {

    const sprites = useSpriteSheet({
        imagePath: 'sprites/weapon_ranged_bullet_sheet.png',
        sliceWidth: 16,
        sliceHeight: 1,
        runs: [
            useSpriteSheetRun({
                name: 'sprite'
            })
        ]
    });

    const options = useSpriteOptions({
        rotation: direction,
        zIndex: 10
    });
    
    const getSprite = () => (
        sprites.sprite({
            position,
            camera: drawCamera,
            options
        })
    );

    const draw = () => {

        const colliderLength = collider.line.getLength();
        const bulletLength = colliderLength / (2 + Math.random()) * 2;
        options.setWidth(bulletLength);

        getSprite().actions.draw();
    };

    return {
        actions: {
            draw
        }
    };
};