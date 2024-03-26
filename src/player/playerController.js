import { input } from 'titanium';
import { binds } from '../keyBinds';

export const usePlayerController = ({
    aimPosition,
    drawCamera,
    playerMotion,
    playerBalance,
    groundDrag,
    walkSpeed,
    sprintSpeed,
    diveDrag,
    diveSpeed
}) => {

    const update = () => {

        aimPosition.moveToPosition(input.getMousePosition(drawCamera));

        if (playerBalance.isOffBalance()) return;
        if (input.isDown(binds.dive)) {

            playerBalance.setOffBalance(true);
            playerMotion.setDrag(diveDrag);
            playerMotion.setAcceleration(diveSpeed);
            playerMotion.accelerateX();
            playerMotion.decelerateY();
            //playerMotion.accelerateY();

            return;
        }

        playerMotion.setDrag(groundDrag);
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