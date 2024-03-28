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

    const dive = () => {

        playerMotion.setDrag(diveDrag);

        input.isDown(binds.moveUp) && playerMotion.impulseY(-diveSpeed);
        input.isDown(binds.moveDown) && playerMotion.impulseY(diveSpeed);
        input.isDown(binds.moveLeft) && playerMotion.impulseX(-diveSpeed);
        input.isDown(binds.moveRight) && playerMotion.impulseX(diveSpeed);

        const {potentialX, potentialY} = playerMotion.getPotential();
        if (!potentialX && !potentialY) {
            playerDirectionState.getState() === directionStates.right &&
                playerMotion.impulseX(diveSpeed) ||
                playerMotion.impulseX(-diveSpeed);
        }
    };

    const update = () => {

        aimPosition.moveToPosition(input.getMousePosition(drawCamera));

        if (playerMovementState.isDiving()) return;
        if (input.wasPressed(binds.dive)) {
            dive();
            return;
        }

        playerMotion.setDrag(groundDrag);
        input.isDown(binds.sprint) && playerMotion.setAcceleration(sprintSpeed) || playerMotion.setAcceleration(walkSpeed);

        input.isDown(binds.moveUp) && playerMotion.decelerateY();
        input.isDown(binds.moveDown) && playerMotion.accelerateY();
        input.isDown(binds.moveLeft) && playerMotion.decelerateX();
        input.isDown(binds.moveRight) && playerMotion.accelerateX();
    };

    return {
        actions: {
            update
        }
    };
};