
import { input } from 'titanium';

import { 
    debugColliderCameraProxy as colliderProxy,
    debugAgitatorCameraProxy as agitatorProxy
} from '../app';

import { binds } from '../keyBinds';

export const useDebugController = () => {

    const update = () => {

        if (input.wasPressed(binds.debug)) {
            colliderProxy.toggle();
            agitatorProxy.toggle();
        }
    };

    return {
        actions: {
            update
        }
    };
};