
export const useCameraProxy = ({
    drawCamera
}) => {

    let enabled = false;
    const setEnabled = value => enabled = value;
    const getEnabled = () => enabled;
    const toggle = () => enabled = !enabled;

    const requestDraw = (callback, zIndex = 0) => {

        if (!enabled) return;

        drawCamera.requestDraw(callback, zIndex);
    } ;

    return {
        ...drawCamera,
        setEnabled,
        getEnabled,
        toggle,
        requestDraw
    };
};