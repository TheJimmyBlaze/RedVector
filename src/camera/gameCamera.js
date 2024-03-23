import { useEntity, useCamera } from 'titanium';

export const useGameCamera = ({
    canvas
}) => {

    const gameCamera = useCamera({canvas});

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