import {
    useRectCollider
} from 'titanium';

export const useRectTerrainCollider = ({
    position,
    width, height,
    drawCamera
}) => {

    const collider = useRectCollider({
        position,
        width, height
    });

    const draw = () => {
        drawCamera.requestDraw(
            ctx => {

                ctx.strokeStyle = ctx.fillStyle = 'lime';

                const {x, y} = position.getPosition();
                ctx.rect(
                    x - width / 2,
                    y - height / 2,
                    width,
                    height
                );
                ctx.stroke();
            },
            1000
        );
    };

    return {
        ...collider,
        actions: {
            draw
        }
    };
};