import { input } from 'titanium';
import { binds } from '../keyBinds';

export const usePlayerController = ({
    playerMotion,
    walkSpeed,
    sprintSpeed
}) => {

    const update = () => {

        input.isDown(binds.sprint) && playerMotion.setAcceleration(sprintSpeed) || playerMotion.setAcceleration(walkSpeed);

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