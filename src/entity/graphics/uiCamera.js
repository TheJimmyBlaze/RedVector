import { useEntity, useCamera } from 'titanium';

export const useUiCamera = ({
    canvas
}) => {

    const name = 'camera.ui';

    const uiCamera = useCamera({canvas: canvas.components.appCanvas});

    const entity = useEntity({
        name,
        components: {
            uiCamera
        }
    });

    return {
        ...entity
    };
};