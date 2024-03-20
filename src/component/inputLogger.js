import { input } from 'titanium';

export const useInputLogger = () => {

    const update = () => {

        const logObject = {};

        const downAliases = Object.keys(input.getBinds());
        downAliases.forEach(bind => logObject[bind] = input.isDown()[bind]());
        
        const pressedAliases = Object.keys(input.getBinds());
        pressedAliases.forEach(bind => logObject[`${bind}Pressed`] = input.wasPressed()[bind]());

        const wheelDelta = input.getMouseWheelDelta();
        logObject['wheelDelta'] = wheelDelta;

        const {x, y} = input.getMousePosition().getPosition();
        logObject['mouseX'] = x;
        logObject['mouseY'] = y;

        console.log(JSON.stringify(logObject));
    };

    return {
        actions: {
            update
        }
    };
};