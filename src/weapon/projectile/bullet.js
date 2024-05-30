import { nanoid } from 'nanoid';
import {
    useEntity,
    useMotion,
    useLine,
    useLineCollider
} from 'titanium';

import { gameCamera as drawCamera } from '../../app';
import { useProjectileBody } from './projectileBody';

export const useBullet = ({
    position,
    direction,
    speed = 1600
}) => {

    //Projectiles need to deregister themselves, and must know the id to deregister upfront
    const entityId = nanoid();

    const previousPosition = position.clone();
    const collider = useLineCollider({
        line: useLine({
            startPosition: position,
            endPosition: previousPosition
        }),
        drawCamera
    });

    const motion = useMotion({
        drag: 0
    });

    const projectileBody = useProjectileBody({
        entityId,
        position,
        previousPosition,
        motion,
        collider
    });

    //Apply impulse to motion on creation
    const radians = direction * Math.PI/180;
    const impulseX = speed * Math.cos(radians);
    const impulseY = speed * Math.sin(radians);
    motion.impulseX(impulseX);
    motion.impulseY(impulseY);

    const entity = useEntity({
        id: entityId,
        components: {
            position,
            motion,
            collider,
            projectileBody
        }
    });

    return {
        ...entity
    };
};