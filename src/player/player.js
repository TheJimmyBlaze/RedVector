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

import { useRifle } from '../weapon/ranged/rifle';
import { useSword } from '../weapon/melee/sword';
import { usePlayerWeapon } from './playerWeapon';

export const usePlayer = ({
    drawCamera
}) => {

    const playerPosition = usePosition({});
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
        playerMotion,
        playerDirectionState,
        playerMovementState
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