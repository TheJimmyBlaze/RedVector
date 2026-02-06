import {
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions
} from 'titanium';
import { images } from '../../globals';

export const useBulletAnimator = ({
    position,
    collider,
    direction,
    drawCamera
}) => {

    const drawPosition = position.copy();
    const sprites = useSpriteSheet({
        image: images.bullet,
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
            position: drawPosition,
            camera: drawCamera,
            options
        })
    );

    const draw = () => {

        const colliderLength = collider.line.getLength();
        const colliderMidPosition = collider.line.findDistancePositionOnLine(colliderLength / 2);
        drawPosition.moveToPosition(colliderMidPosition);

        options.setWidth(colliderLength);
        getSprite().actions.draw();
    };

    return {
        actions: {
            draw
        }
    };
};