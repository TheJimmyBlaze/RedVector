import { useEntity, useCamera } from 'titanium';

export const useGameCamera = ({
    canvas
}) => {

    const gameCamera = useCamera({canvas: canvas.components.appCanvas});

    const entity = useEntity({
        components: {
            gameCamera
        }
    });

    return {
        ...entity
    };
};