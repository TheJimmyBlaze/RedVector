import { 
    useRectCollider
} from 'titanium';

import {
    debugAgitatorCameraProxy as drawCamera
} from '../../app';

export const useImpulseField = ({
    position,
    width, height
}) => {

    const collider = useRectCollider({
        position,
        width, height,
        drawCamera
    });

    const update = () => {

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