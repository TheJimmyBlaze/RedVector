import {
    registry, 
    motionBody,
    useLine
} from 'titanium';

export const useProjectileBody = ({
    entityId,
    position,
    endPosition,
    lengthMultiplier = 1,
    motion,
    collider
}) => {

    if (!entityId) throw new error('entityId is not defined');

    let willDestroy = false;

    const startPosition = position.copy();
    const body = motionBody({
        obstructiveColliderComponent: 'terrainCollider',
        position,
        motion,
        collider
    });

    const destroy = () => {

        const projectileEntity = registry.getEntityById(entityId);
        registry.deregister(projectileEntity);
    };

    const update = () => {

        if (willDestroy) return destroy();

        const deltaPosition = position.copy();
        const collisions = body.move();

        const deltaLine = useLine({
            startPosition: position,
            endPosition: deltaPosition
        });
        const deltaLength = deltaLine.getLength();
        const maxLength = deltaLength * lengthMultiplier;

        const minLine = useLine({
            startPosition: position,
            endPosition: startPosition
        });
        const minLength = minLine.getLength();
        const length = Math.min(minLength, maxLength);

        const newEndPosition = deltaLine.findDistancePositionOnLine(-length);
        endPosition.moveToPosition(newEndPosition);

        if (!collisions?.length) return;
        willDestroy = true;
    };

    return {
        startPosition,
        endPosition,
        motion,
        collider, 
        actions: {
            update
        }
    };
};