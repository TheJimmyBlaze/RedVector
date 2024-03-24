import { 
    usePosition,
    useMotion,
    useCircleCollider,
    useRigidBody,
    useEntity
} from 'titanium';

import { usePlayerController } from './playerController';
import { usePlayerDirectionState } from './playerDirectionState';
import { usePlayerMovementState } from './playerMovementState';
import { usePlayerAnimator } from './playerAnimator';

export const usePlayer = ({
    drawCamera
}) => {

    const walkSpeed = 10;
    const sprintSpeed = 20;

    const playerPosition = usePosition({});
    const aimPosition = usePosition({});

    const playerMotion = useMotion({
        acceleration: walkSpeed
    });

    const playerController = usePlayerController({
        aimPosition,
        drawCamera,
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

    const playerDirectionState = usePlayerDirectionState({
        playerPosition,
        aimPosition
    });

    const playerMovementState = usePlayerMovementState({
        playerPosition,
        playerMotion,
        walkSpeed,
        sprintSpeed
    });

    const playerAnimator = usePlayerAnimator({
        playerPosition,
        playerMotion,
        playerDirectionState,
        playerMovementState,
        drawCamera
    });

    const entity = useEntity({
        components: {
            playerPosition,
            playerMotion,
            playerController,
            playerCollider,
            playerRigidBody,
            playerDirectionState,
            playerMovementState,
            playerAnimator
        }
    });

    return {
        ...entity
    };
};