import { 
    usePosition,
    useMotion,
    useCircleCollider,
    useRigidBody,
    useEntity
} from 'titanium';

import { 
    gameCamera as drawCamera
} from '../globals';

import { usePlayerPositionStorage } from './playerPositionStorage';
import { usePlayerController } from './playerController';
import { usePlayerCameraController } from './playerCameraController';
import { usePlayerDirectionState } from './playerDirectionState';
import { usePlayerMovementState } from './playerMovementState';
import { usePlayerAnimator } from './playerAnimator';
import { usePlayerWeapon } from './playerWeapon';

export const usePlayer = () => {

    const position = usePosition({});
    const playerPositionStorage = usePlayerPositionStorage({
        position
    });
    playerPositionStorage.load();

    const shoulderPosition = usePosition({
        y: -2,
        parent: position
    });
    const aimPosition = usePosition({});

    const motion = useMotion({});

    const playerDirectionState = usePlayerDirectionState({
        position,
        aimPosition
    });

    const playerMovementState = usePlayerMovementState({
        motion
    });

    const playerController = usePlayerController({
        aimPosition,
        drawCamera,
        position,
        motion,
        playerDirectionState,
        playerMovementState
    });

    const playerCameraController = usePlayerCameraController({
        position,
        drawCamera
    });

    const colliderPosition = usePosition({
        parent: position
    });

    const playerCollider = useCircleCollider({
        position: colliderPosition,
        radius: 6
    });
    
    const rigidBody = useRigidBody({
        obstructiveColliderComponent: 'terrainCollider',
        position,
        motion,
        collider: playerCollider
    });

    const playerAnimator = usePlayerAnimator({
        position,
        motion,
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
            position,
            playerPositionStorage,
            motion,
            playerController,
            playerCameraController,
            playerCollider,
            rigidBody,
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