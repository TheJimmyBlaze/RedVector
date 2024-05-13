import { 
    usePosition,
    useMotion,
    useCircleCollider,
    useRigidBody,
    useEntity
} from 'titanium';

import { usePlayerPositionStorage } from './playerPositionStorage';
import { usePlayerController } from './playerController';
import { usePlayerCameraController } from './playerCameraController';
import { usePlayerDirectionState } from './playerDirectionState';
import { usePlayerMovementState } from './playerMovementState';
import { usePlayerAnimator } from './playerAnimator';
import { usePlayerWeapon } from './playerWeapon';

export const usePlayer = ({
    drawCamera
}) => {

    const playerPosition = usePosition({});
    const playerPositionStorage = usePlayerPositionStorage({
        playerPosition
    });
    playerPositionStorage.load();

    const shoulderPosition = usePosition({
        y: -2,
        parent: playerPosition
    });
    const aimPosition = usePosition({});

    const playerMotion = useMotion({});

    const playerDirectionState = usePlayerDirectionState({
        playerPosition,
        aimPosition
    });

    const playerMovementState = usePlayerMovementState({
        playerMotion
    });

    const playerController = usePlayerController({
        aimPosition,
        drawCamera,
        playerPosition,
        playerMotion,
        playerDirectionState,
        playerMovementState
    });

    const playerCameraController = usePlayerCameraController({
        playerPosition,
        drawCamera
    });

    const colliderPosition = usePosition({
        y: -4,
        parent: playerPosition
    });

    const playerCollider = useCircleCollider({
        position: colliderPosition,
        radius: 8,
        drawCamera
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

    const playerWeapon = usePlayerWeapon({
        position: shoulderPosition,
        aimPosition,
        directionState: playerDirectionState,
        movementState: playerMovementState,
        drawCamera
    });

    const entity = useEntity({
        components: {
            playerPosition,
            playerPositionSaver: playerPositionStorage,
            playerMotion,
            playerController,
            playerCameraController,
            playerCollider,
            playerRigidBody,
            playerDirectionState,
            playerMovementState,
            playerAnimator,
            playerWeapon
        }
    });

    return {
        ...entity
    };
};