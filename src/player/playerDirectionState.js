import { useFiniteStateMachine } from 'titanium';

export const directionStates = {
    left: 'player.state.direction.left',
    right: 'player.state.direction.right'
};

export const usePlayerDirectionState = ({
    playerPosition,
    aimPosition
}) => {

    const machine = useFiniteStateMachine({
        initialState: directionStates.right
    });

    machine.addTransition({
        exitState: directionStates.left,
        enterState: directionStates.right,
        condition: () => {
            
            const { x: aimX } = aimPosition.getPosition();
            const { x: playerX } = playerPosition.getPosition();

            return aimX > playerX;
        }
    });

    machine.addTransition({
        exitState: directionStates.right,
        enterState: directionStates.left,
        condition: () => {

            const { x: aimX } = aimPosition.getPosition();
            const { x: playerX } = playerPosition.getPosition();

            return aimX < playerX;
        }
    });

    return {
        ...machine
    };
};