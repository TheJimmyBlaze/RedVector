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

    let willDestroy = false;

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

        if (willDestroy) destroy();

        const {x, y} = position.getPosition();
        const collisions = body.move();

        //The previous position joins the line collider form where the bullet it to where it last was
        previousPosition.moveTo(x, y);

        if (!collisions?.length) return;
        willDestroy = true;
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