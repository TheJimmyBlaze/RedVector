import { useFiniteStateMachine } from 'titanium';

export const directionStates = {
    left: 'player.state.direction.left',
    right: 'player.state.direction.right'
};

export const usePlayerDirectionState = ({
    position,
    aimPosition
}) => {

    const machine = useFiniteStateMachine({
        initialState: directionStates.right
    });

    const isLeft = () => machine.getState() === directionStates.left;
    const isRight = () => machine.getState() === directionStates.right;

    machine.addTransition({
        exitState: directionStates.left,
        enterState: directionStates.right,
        condition: () => {
            
            const { x: aimX } = aimPosition.getPosition();
            const { x: playerX } = position.getPosition();

            return aimX > playerX;
        }
    });

    machine.addTransition({
        exitState: directionStates.right,
        enterState: directionStates.left,
        condition: () => {

            const { x: aimX } = aimPosition.getPosition();
            const { x: playerX } = position.getPosition();

            return aimX < playerX;
        }
    });

    return {
        isLeft,
        isRight,
        ...machine
    };
};