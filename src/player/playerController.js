import { input } from 'titanium';
import { binds } from '../keyBinds';
import { directionStates } from './playerDirectionState';

export const usePlayerController = ({
    aimPosition,
    drawCamera,
    motion,
    playerDirectionState,
    playerMovementState
}) => {

    const groundDrag = 10;
    const walkSpeed = 600;
    const sprintSpeed = 900;

    const diveDrag = 5;
    const diveSpeed = 300;

    const dive = () => {

        motion.setDrag(diveDrag);

        input().isDown(binds.moveUp) && motion.impulseY(-diveSpeed);
        input().isDown(binds.moveDown) && motion.impulseY(diveSpeed);
        input().isDown(binds.moveLeft) && motion.impulseX(-diveSpeed);
        input().isDown(binds.moveRight) && motion.impulseX(diveSpeed);

        const {potentialX, potentialY} = motion.getPotential();
        if (!potentialX && !potentialY) {
            playerDirectionState.getState() === directionStates.right &&
                motion.impulseX(diveSpeed) ||
                motion.impulseX(-diveSpeed);
        }
    };

    const update = () => {

        aimPosition.moveToPosition(input().getMousePosition(drawCamera));

        if (playerMovementState.isDiving()) return;
        if (input().wasPressed(binds.dive)) {
            dive();
            return;
        }

        motion.setDrag(groundDrag);
        input().isDown(binds.sprint) && motion.setAcceleration(sprintSpeed) || motion.setAcceleration(walkSpeed);

        input().isDown(binds.moveUp) && motion.decelerateY();
        input().isDown(binds.moveDown) && motion.accelerateY();
        input().isDown(binds.moveLeft) && motion.decelerateX();
        input().isDown(binds.moveRight) && motion.accelerateX();
    };

    return {
        actions: {
            update
        }
    };
};