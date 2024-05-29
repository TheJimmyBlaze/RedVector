
import { input } from 'titanium';

import { 
    debugColliderCameraProxy as colliderProxy
} from '../app';

import { binds } from '../keyBinds';

export const useDebugController = () => {

    const update = () => {

        input.wasPressed(binds.debug) && colliderProxy.toggle();
    };

    return {
        actions: {
            update
        }
    };
};