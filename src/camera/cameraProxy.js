
export const useCameraProxy = ({
    drawCamera,
    drawColour = null
}) => {

    let enabled = false;
    const setEnabled = value => enabled = value;
    const getEnabled = () => enabled;
    const toggle = () => enabled = !enabled;

    const requestDraw = (callback, zIndex = 0) => {

        if (!enabled) return;

        drawCamera.requestDraw(ctx => {

            if (drawColour) {
                ctx.strokeStyle = ctx.fillStyle = drawColour;
            }

            callback(ctx);
            
        }, zIndex);
    } ;

    return {
        ...drawCamera,
        setEnabled,
        getEnabled,
        toggle,
        requestDraw
    };
};