import { useEntity, useCamera } from 'titanium';

export const useUiCamera = ({
    canvas
}) => {

    const uiCamera = useCamera({canvas});

    const entity = useEntity({
        components: {
            uiCamera
        }
    });

    return {
        ...uiCamera,
        ...entity
    };
};