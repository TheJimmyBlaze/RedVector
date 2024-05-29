import { input } from 'titanium';

import { useRifle } from '../weapon/ranged/rifle';
import { useSword } from '../weapon/melee/sword';

import { binds } from '../keyBinds';

export const usePlayerWeapon = ({
    position,
    aimPosition,
    directionState,
    movementState,
    drawCamera
}) => {

    let weapon = null;
    const setWeapon = callback => weapon = callback({
        position,
        aimPosition,
        directionState,
        movementState,
        drawCamera
    });
    setWeapon(useRifle);

    const update = () => {

        input.wasPressed(binds.weaponOne) && setWeapon(useRifle);
        input.wasPressed(binds.weaponTwo) && setWeapon(useSword);

        weapon.actions.update();
    };

    const draw = () => weapon.actions.draw();

    return {
        setWeapon,
        actions: {
            update,
            draw
        }
    };
};