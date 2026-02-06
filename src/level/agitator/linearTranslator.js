import { 
    deltaTime,
    registry,
    useRectCollider
} from 'titanium';


export const useLinearTranslator = ({
    position,
    width, height,
    translateXX = 0,
    translateXY = 0,
    translateYX = 0,
    translateYY = 0
}) => {

    const collider = useRectCollider({
        position,
        width, height
    });

    const update = () => {
        
        const bodies = registry().getComponentsByName("rigidBody");
        const collisions = bodies.filter(candidate => candidate.collider.overlaps(collider));

        if (!collisions?.length) return;

        collisions.forEach(body => {

            const {
                velocityX,
                velocityY
            } = body.motion.getMotion();

            body.position.move(
                (velocityX * translateXX + velocityY * translateXY) * deltaTime(),  
                (velocityX * translateYX + velocityY * translateYY) * deltaTime()
            );
        });
    };

    return {
        actions: {
            update
        }
    };
};