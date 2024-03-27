import { 
    usePosition,
    useMotion,
    useCircleCollider,
    useRigidBody,
    useEntity
} from 'titanium';

import { usePlayerController } from './playerController';
import { usePlayerCameraController } from './playerCameraController';
import { usePlayerDirectionState } from './playerDirectionState';
import { usePlayerMovementState } from './playerMovementState';
import { usePlayerAnimator } from './playerAnimator';

export const usePlayer = ({
    drawCamera
}) => {

    const groundDrag = 10;
    const walkSpeed = 250;
    const sprintSpeed = 500;

    const diveDrag = 5;
    const diveSpeed = 250;

    const playerPosition = usePosition({});
    const aimPosition = usePosition({});

    const playerMotion = useMotion({
        acceleration: walkSpeed,
        drag: groundDrag
    });

    const playerDirectionState = usePlayerDirectionState({
        playerPosition,
        aimPosition
    });

    const playerMovementState = usePlayerMovementState({
        playerMotion,
        walkSpeed,
        sprintSpeed
    });

    const playerController = usePlayerController({
        aimPosition,
        drawCamera,
        playerMotion,
        playerDirectionState,
        playerMovementState,
        groundDrag,
        walkSpeed,
        sprintSpeed,
        diveDrag,
        diveSpeed
    });

    const playerCameraController = usePlayerCameraController({
        playerPosition,
        drawCamera
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
            playerCameraController,
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