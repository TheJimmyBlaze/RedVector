import { useEntity, useCanvas } from 'titanium';

export const useAppCanvas = () => {

    const name = 'canvas.app';

    const appCanvas = useCanvas({elementId: 'appCanvas'});

    const entity = useEntity({
        name,
        components: {
            appCanvas
        }
    });

    return {
        ...entity
    };
};