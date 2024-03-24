import { useFiniteStateMachine } from 'titanium';

export const movementStates = {
    idle: 'player.state.movement.idle',
    walk: 'player.state.movement.walk',
    run: 'player.state.movement.run',
    dive: 'player.state.movement.dive'
};

export const usePlayerMovementState = ({
    playerMotion,
    walkSpeed,
    sprintSpeed
}) => {

    const machine = useFiniteStateMachine({
        initialState: movementStates.idle
    });

    //Walk
    machine.addTransition({
        exitState: movementStates.idle,
        enterState: movementStates.walk,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= walkSpeed
    });
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.idle,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < walkSpeed
    });

    //Run
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.run,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= sprintSpeed * 3.5
    });
    machine.addTransition({
        exitState: movementStates.run,
        enterState: movementStates.walk,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < sprintSpeed * 3.5
    });

    //Dive
    machine.addTransition({
        exitState: movementStates.run,
        enterState: movementStates.dive,
        condition: () => false
    });

    return {
        ...machine
    };
};