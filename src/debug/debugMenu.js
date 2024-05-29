import { useEntity } from 'titanium';
import { useDebugController } from './debugController';

export const useDebugMenu = () => {

    const debugController = useDebugController();

    const entity = useEntity({
        components: {
            debugController
        }
    });

    return {
        ...entity
    };
};