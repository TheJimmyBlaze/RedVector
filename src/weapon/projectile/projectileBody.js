import {
    registry, 
    motionBody 
} from 'titanium';

export const useProjectileBody = ({
    entityId,
    position,
    previousPosition,
    motion,
    collider
}) => {

    if (!entityId) throw new error('entityId is not defined');

    const body = motionBody({
        obstructiveColliderComponent: 'terrainCollider',
        position,
        motion,
        collider
    });

    const update = () => {

        const {x, y} = position.getPosition();
        const collisions = body.move();

        //The previous position joins the line collider form where the bullet it to where it last was
        previousPosition.moveTo(x, y);

        if (!collisions?.length) return;

        const projectileEntity = registry.getEntityById(entityId);
        registry.deregister(projectileEntity);
    };

    return {
        position,
        motion,
        collider, 
        actions: {
            update
        }
    };
};