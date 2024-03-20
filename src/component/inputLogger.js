import { input, mousePosition } from 'titanium';

export const useInputLogger = () => {

    const update = () => {

        const logObject = {};

        const bindAliases = Object.keys(input.getBinds());
        bindAliases.forEach(bind => logObject[bind] = input.getInput()[bind]());

        const wheelDelta = input.getMouseWheelDelta();
        logObject['wheelDelta'] = wheelDelta;

        const {x, y} = mousePosition.getRelativePosition().getPosition();
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