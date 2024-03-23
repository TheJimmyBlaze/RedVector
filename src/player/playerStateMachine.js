import { useFiniteStateMachine } from 'titanium';

export const playerStates = {
    idle: {
        left: 'player.state.idle.left',
        right: 'player.state.idle.right'
    },
    walk: {
        left: 'player.state.walk.left',
        right: 'player.state.walk.right',
        leftBackwards: 'player.state.walk.leftBackwards',
        rightBackwards: 'player.state.walk.rightBackwards'
    },
    run: {
        left: 'player.state.run.left',
        right: 'player.state.run.right'
    },
    dive: {
        left: 'player.state.dive.left',
        right: 'player.state.dive.right'
    }
};

export const usePlayerStateMachine = ({
    playerMotion,
    walkSpeed,
    sprintSpeed
}) => {

    const finiteStateMachine = useFiniteStateMachine({
        initialState: playerStates.idle.right
    });

    //Idle
    finiteStateMachine.addTransition({
        exitState: playerStates.idle.right,
        enterState: playerStates.idle.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.idle.left,
        enterState: playerStates.idle.right,
        condition: () => false
    });

    //Walk
    finiteStateMachine.addTransition({
        exitState: playerStates.idle.right,
        enterState: playerStates.walk.right,
        condition: () => playerMotion.getMotion().velocityX >= walkSpeed
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.idle.right,
        enterState: playerStates.walk.rightBackwards,
        condition: () => playerMotion.getMotion().velocityX <= -walkSpeed
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.idle.left,
        enterState: playerStates.walk.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.idle.left,
        enterState: playerStates.walk.leftBackwards,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.right,
        enterState: playerStates.idle.right,
        condition: () => playerMotion.getMotion().velocityX < walkSpeed
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.left,
        enterState: playerStates.idle.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.rightBackwards,
        enterState: playerStates.idle.right,
        condition: () => playerMotion.getMotion().velocityX > -walkSpeed
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.leftBackwards,
        enterState: playerStates.idle.left,
        condition: () => false
    });

    //Run
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.right,
        enterState: playerStates.run.right,
        condition: () => playerMotion.getMotion().velocityX >= sprintSpeed * 2.5
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.left,
        enterState: playerStates.run.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.run.right,
        enterState: playerStates.walk.right,
        condition: () => playerMotion.getMotion().velocityX < sprintSpeed * 2.5
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.run.left,
        enterState: playerStates.walk.left,
        condition: () => false
    });

    //Dive
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.right,
        enterState: playerStates.dive.right,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.left,
        enterState: playerStates.dive.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.rightBackwards,
        enterState: playerStates.dive.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.walk.leftBackwards,
        enterState: playerStates.dive.right,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.run.right,
        enterState: playerStates.dive.right,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.run.left,
        enterState: playerStates.dive.left,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.dive.right,
        enterState: playerStates.idle.right,
        condition: () => false
    });
    finiteStateMachine.addTransition({
        exitState: playerStates.dive.left,
        enterState: playerStates.idle.left,
        condition: () => false
    });

    return {
        ...finiteStateMachine
    };
};