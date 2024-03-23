import { 
    usePosition,
    useMotion,
    useCircleCollider,
    useRigidBody,
    useEntity,
    input
} from 'titanium';

import { usePlayerController } from './playerController';
import { usePlayerStateMachine } from './playerStateMachine';
import { usePlayerAnimator } from './playerAnimator';

export const usePlayer = ({
    drawCamera
}) => {

    const playerPosition = usePosition({});
    const playerMotion = useMotion({});
    const playerController = usePlayerController({
        playerMotion
    });

    const colliderPosition = usePosition({
        y: -16,
        parent: playerPosition
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
        playerPosition,
        playerMotion
    });
    const playerAnimator = usePlayerAnimator({
        playerPosition,
        playerStateMachine,
        drawCamera
    });

    const entity = useEntity({
        components: {
            playerPosition,
            playerMotion,
            playerController,
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