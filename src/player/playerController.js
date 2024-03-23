import { input } from 'titanium';
import { binds } from '../keyBinds';

export const usePlayerController = ({
    playerMotion
}) => {

    const update = () => {

        input.isDown(binds.moveUp) && playerMotion.decelerateY();
        input.isDown(binds.moveDown) && playerMotion.accelerateY();
        input.isDown(binds.moveRight) && playerMotion.accelerateX();
        input.isDown(binds.moveLeft) && playerMotion.decelerateX();
    };

    return {
        actions: {
            update
        }
    };
};