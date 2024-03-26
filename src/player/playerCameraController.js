import { lerp, usePosition } from 'titanium';

export const usePlayerCameraController = ({
    playerPosition,
    drawCamera
}) => {

    const cameraFocus = usePosition({});
    drawCamera.position.setParent(cameraFocus);

    const update = () => {
        cameraFocus.lerpToPosition(playerPosition, 0.00001);
    };

    return {
        actions: {
            update
        }
    };
};
