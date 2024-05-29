import { 
    useEntity,
    useFrameProfiler
} from 'titanium';

import { 
    debugProfilerCameraProxy as profilerCamera
} from '../app';

import { useDebugController } from './debugController';

export const useDebugMenu = () => {

    const debugController = useDebugController();
    const frameProfiler = useFrameProfiler({ drawCamera: profilerCamera });

    const entity = useEntity({
        components: {
            debugController,
            frameProfiler
        }
    });

    return {
        ...entity
    };
};