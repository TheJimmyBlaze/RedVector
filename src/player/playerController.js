import { input } from 'titanium';
import { binds } from '../keyBinds';

export const usePlayerController = ({
    aimPosition,
    drawCamera,
    playerMotion,
    walkSpeed,
    sprintSpeed
}) => {

    const update = () => {

        aimPosition.moveToPosition(input.getMousePosition(drawCamera));

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