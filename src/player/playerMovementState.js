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
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= 1
    });
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.idle,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < 1
    });

    //Run
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.run,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= 40
    });
    machine.addTransition({
        exitState: movementStates.run,
        enterState: movementStates.walk,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < 40
    });

    //Dive
    machine.addTransition({
        exitState: movementStates.run,
        enterState: movementStates.dodge,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= 80
    });
    machine.addTransition({
        exitState: movementStates.dodge,
        enterState: movementStates.recover,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < 40
    });

    return {
        isDiving,
        ...machine
    };
};