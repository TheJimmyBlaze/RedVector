import { useEntity, useCamera } from 'titanium';

export const useUiCamera = ({
    canvas
}) => {

    const uiCamera = useCamera({canvas: canvas.components.appCanvas});

    const entity = useEntity({
        components: {
            uiCamera
        }
    });

    return {
        ...entity
    };
};