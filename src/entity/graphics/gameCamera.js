import { useEntity, useCamera } from 'titanium';

export const useGameCamera = ({
    canvas
}) => {

    const name = 'camera.game';

    const gameCamera = useCamera({canvas: canvas.components.appCanvas});

    const entity = useEntity({
        name,
        components: {
            gameCamera
        }
    });

    return {
        ...entity
    };
};