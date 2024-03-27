import { useFiniteStateMachine } from 'titanium';

export const movementStates = {
    idle: 'player.state.movement.idle',
    walk: 'player.state.movement.walk',
    run: 'player.state.movement.run',
    dodge: 'player.state.movement.doge',
    recover: 'player.state.movement.recover'
};

export const usePlayerMovementState = ({
    playerMotion,
    walkSpeed,
    sprintSpeed
}) => {

    const machine = useFiniteStateMachine({
        initialState: movementStates.idle
    });

    const isDiving = () => (
        machine.getState() === movementStates.dodge ||
        machine.getState() === movementStates.recover
    );

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
        enterState: movementStates.dodge,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= sprintSpeed * 7
    });
    machine.addTransition({
        exitState: movementStates.dodge,
        enterState: movementStates.recover,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < walkSpeed
    });

    return {
        isDiving,
        ...machine
    };
};