import { useEntity, useCanvas } from 'titanium';

export const useAppCanvas = () => {

    const appCanvas = useCanvas({
        elementId: 'appCanvas'
    });

    const entity = useEntity({
        components: {
            appCanvas
        }
    });

    return {
        ...appCanvas,
        ...entity
    };
};