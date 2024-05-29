import { lerp, usePosition } from 'titanium';

export const usePlayerCameraController = ({
    position,
    drawCamera
}) => {

    const cameraFocus = usePosition({});
    drawCamera.position.setParent(cameraFocus);

    const update = () => {
        cameraFocus.lerpToPosition(position, 0.00001);
    };

    return {
        actions: {
            update
        }
    };
};
