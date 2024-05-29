import { 
    registry,
    useRectCollider
} from 'titanium';

import {
    debugAgitatorCameraProxy as drawCamera
} from '../../app';

export const useLinearTranslator = ({
    position,
    width, height,
    translateXX = 0,
    translateXY = 0,
    translateYX = 0,
    translateYY = 0
}) => {

    const collider = useRectCollider({
        position,
        width, height,
        drawCamera
    });

    const update = () => {
        
        const bodies = registry.getComponentsByName("rigidBody");
        const collisions = bodies.filter(candidate => candidate.collider.overlaps(collider));

        if (!collisions?.length) return;

        collisions.forEach(body => {

            const {
                velocityX,
                velocityY
            } = body.motion.getMotion();

            body.position.move(
                velocityX * translateXX + velocityY * translateXY, 
                velocityX * translateYX + velocityY * translateYY
            );
        });
    };

    const draw = () => {
        collider.actions.draw();
    };

    return {
        actions: {
            update,
            draw
        }
    };
};