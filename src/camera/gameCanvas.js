import { useEntity, useCanvasCtx } from 'titanium';

export const useGameCanvas = () => {

    const canvas = useCanvasCtx({
        elementId: 'gameCanvas'
    });

    const entity = useEntity({
        components: {
            canvas
        }
    });

    return {
        ...canvas,
        ...entity
    };
};