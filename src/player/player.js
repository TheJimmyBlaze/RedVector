import { 
    usePosition,
    useMotion,
    useCircleCollider,
    useRigidBody,
    useEntity,
    input
} from 'titanium';

import { usePlayerStateMachine } from './playerStateMachine';
import { usePlayerAnimator } from './playerAnimator';

export const usePlayer = () => {

    const playerPosition = usePosition({});
    const playerMotion = useMotion({});

    const colliderPosition = usePosition({
        y: -16,
        parent: position
    });
    const playerCollider = useCircleCollider({
        position: colliderPosition,
        radius: 16
    });
    
    const playerRigidBody = useRigidBody({
        obstructiveColliderComponent: 'terrainCollider',
        position: playerPosition,
        motion: playerMotion,
        collider: playerCollider
    });

    const playerStateMachine = usePlayerStateMachine({
        playerMotion
    });
    const playerAnimator = usePlayerAnimator({
        playerStateMachine
    });

    const entity = useEntity({
        components: {
            playerPosition,
            playerMotion,
            playerCollider,
            playerRigidBody,
            playerStateMachine,
            playerAnimator
        }
    });

    return {
        ...entity
    };
};