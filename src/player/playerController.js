import { input } from 'titanium';
import { binds } from '../keyBinds';
import { directionStates } from './playerDirectionState';

export const usePlayerController = ({
    aimPosition,
    drawCamera,
    playerMotion,
    playerDirectionState,
    playerMovementState,
    groundDrag,
    walkSpeed,
    sprintSpeed,
    diveDrag,
    diveSpeed
}) => {

    const update = () => {

        aimPosition.moveToPosition(input.getMousePosition(drawCamera));

        if (playerMovementState.isDiving()) return;
        if (input.wasPressed(binds.dive)) {

            playerMotion.stop();

            playerMotion.setDrag(diveDrag);
            playerMotion.setAcceleration(diveSpeed);

            input.isDown(binds.moveUp) && playerMotion.decelerateY();
            input.isDown(binds.moveDown) && playerMotion.accelerateY();
            input.isDown(binds.moveRight) && playerMotion.accelerateX();
            input.isDown(binds.moveLeft) && playerMotion.decelerateX();

            const {potentialX, potentialY} = playerMotion.getPotential();
            if (!potentialX && !potentialY) {
                playerDirectionState.getState() === directionStates.right &&
                    playerMotion.accelerateX() ||
                    playerMotion.decelerateX();
            }

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