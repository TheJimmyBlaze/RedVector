import { useEntity, useCamera } from 'titanium';

export const gameCamera = ({
    canvas
}) => {

    const name = 'camera.game';

    const gameCamera = useCamera({canvas});

    const entity = useEntity({
        name,
        components: [
            gameCamera
        ]
    });

    return {
        ...entity
    };
};