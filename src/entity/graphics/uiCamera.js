import { useEntity, useCamera } from 'titanium';

export const uiCamera = ({
    canvas
}) => {

    const name = 'camera.ui';

    const uiCamera = useCamera({canvas});

    const entity = useEntity({
        name,
        components: [
            uiCamera
        ]
    });

    return {
        ...entity
    };
};