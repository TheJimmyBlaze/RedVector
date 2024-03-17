import { useEntity, useCanvas } from 'titanium';

export const appCanvas = () => {

    const name = 'canvas.app';

    const appCanvas = useCanvas('appCanvas');

    const entity = useEntity({
        name,
        components: [
            appCanvas
        ]
    });

    return {
        ...entity
    };
};