import { useFiniteStateMachine } from 'titanium';

export const movementStates = {
    idle: 'player.state.movement.idle',
    walk: 'player.state.movement.walk',
    run: 'player.state.movement.run',
    dodge: 'player.state.movement.doge',
    recover: 'player.state.movement.recover'
};

export const usePlayerMovementState = ({
    playerMotion
}) => {

    const idleThreshold = 1;
    const walkThreshold = 50;
    const runThreshold = 150;
    const rollThreshold = 100;

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
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= idleThreshold
    });
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.idle,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < idleThreshold
    });

    //Run
    machine.addTransition({
        exitState: movementStates.walk,
        enterState: movementStates.run,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= walkThreshold
    });
    machine.addTransition({
        exitState: movementStates.run,
        enterState: movementStates.walk,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < walkThreshold
    });

    //Dive
    machine.addTransition({
        exitState: movementStates.run,
        enterState: movementStates.dodge,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) >= runThreshold
    });
    machine.addTransition({
        exitState: movementStates.dodge,
        enterState: movementStates.recover,
        condition: () => Math.abs(playerMotion.getMotion().velocityX) + Math.abs(playerMotion.getMotion().velocityY) < rollThreshold
    });

    return {
        isDiving,
        ...machine
    };
};