import { useEntity } from 'titanium';
import { useInputLogger } from './inputLogger';

export const useInputTest = () => {

    const logger = useInputLogger();

    const entity = useEntity({
        components: {
            logger
        }
    });

    return {
        ...entity
    };
};