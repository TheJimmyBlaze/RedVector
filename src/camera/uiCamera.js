import { useEntity, useCameraCtx } from 'titanium';

export const useUiCamera = ({
    canvas
}) => {

    const uiCamera = useCameraCtx({canvas});

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