import { nanoid } from 'nanoid';
import {
    useEntity,
    useMotion,
    useLine,
    useLineCollider,
    useSpriteSheet,
    useSpriteSheetRun,
    useSpriteOptions
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

    const previousPosition = position.copy();
    const collider = useLineCollider({
        line: useLine({
            startPosition: position,
            endPosition: previousPosition
        }),
        //drawCamera
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

    const sprite = useSpriteSheet({
        imagePath: 'sprites/weapon_ranged_bullet_sheet.png',
        sliceWidth: 16,
        sliceHeight: 1,
        runs: [
            useSpriteSheetRun({
                name: 'sprite'
            })
        ]
    }).sprite({
        position,
        camera: drawCamera,
        options: useSpriteOptions({
            rotation: direction,
            zIndex: 10
        })
    });

    const entity = useEntity({
        id: entityId,
        components: {
            position,
            motion,
            collider,
            projectileBody,
            sprite
        }
    });

    return {
        ...entity
    };
};