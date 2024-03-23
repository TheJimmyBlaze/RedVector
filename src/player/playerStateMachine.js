import { useFiniteStateMachine, useEntity } from 'titanium';

export const idleLeft = 'player.state.idleLeft';
export const idleRight = 'player.state.idleRight';

export const walkLeft = 'player.state.walkLeft';
export const walkBackLeft = 'player.state.walkBackLeft';
export const walkRight = 'player.state.walkRight';
export const walkBackRight = 'player.state.walkBackRight';

export const runLeft = 'player.state.runLeft';
export const runRight = 'player.state.runRight';

export const diveLeft = 'player.state.diveLeft';
export const diveRight = 'player.state.diveRight';


export const usePlayerStateMachine = () => {

    const finiteStateMachine = useFiniteStateMachine({
        initialState: idleRight
    });

    //Idle
    finiteStateMachine.addTransition({
        exitState: idleRight,
        enterState: idleLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: idleLeft,
        enterState: idleRight,
        condition: () => false
    });

    //Walk
    finiteStateMachine.addTransition({
        exitState: idleRight,
        enterState: walkRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: idleRight,
        enterState: walkBackRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: idleLeft,
        enterState: walkLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: idleLeft,
        enterState: walkBackLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkRight,
        enterState: idleRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkLeft,
        enterState: idleLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkBackRight,
        enterState: idleRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkBackLeft,
        enterState: idleLeft,
        condition: () => false
    });

    //Run
    finiteStateMachine.addTransition({
        exitState: walkRight,
        enterState: runRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkLeft,
        enterState: runLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: runRight,
        enterState: walkRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: runLeft,
        enterState: walkLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: runRight,
        enterState: idleRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: runLeft,
        enterState: idleLeft,
        condition: () => false
    });

    //Dive
    finiteStateMachine.addTransition({
        exitState: walkRight,
        enterState: diveRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkLeft,
        enterState: diveLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkBackRight,
        enterState: diveLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: walkBackLeft,
        enterState: diveRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: runRight,
        enterState: diveRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: runLeft,
        enterState: diveLeft,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: diveRight,
        enterState: idleRight,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: diveLeft,
        enterState: idleLeft,
        condition: () => false
    });

    const entity = useEntity({
        components: {
            finiteStateMachine
        }
    });

    return {
        ...entity
    };
};