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

    const walkSpeed = 10;
    const sprintSpeed = 20;

    const playerPosition = usePosition({});
    const playerMotion = useMotion({
        acceleration: walkSpeed
    });
    const playerController = usePlayerController({
        playerMotion,
        walkSpeed,
        sprintSpeed
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
        playerMotion,
        walkSpeed,
        sprintSpeed
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