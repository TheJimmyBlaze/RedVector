import { useEntity, useCameraCtx } from 'titanium';

export const useGameCamera = ({
    canvas
}) => {

    const gameCamera = useCameraCtx({canvas});

    const entity = useEntity({
        components: {
            gameCamera
        }
    });

    return {
        ...gameCamera,
        ...entity
    };
};