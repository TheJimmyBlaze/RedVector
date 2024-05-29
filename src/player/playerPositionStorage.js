
const playerPosition = "playerPosition";
const playerX = `${playerPosition}X`;
const playerY = `${playerPosition}Y`;

export const usePlayerPositionStorage = ({
    position,
}) => {

    const {x: defaultX, y: defaultY} = position.getPosition();

    const load = () => {

        let x = localStorage.getItem(playerX) ?? defaultX;
        let y = localStorage.getItem(playerY) ?? defaultY;

        if (isNaN(x)) {x = defaultX}
        if (isNaN(y)) {y = defaultY}

        position.moveTo(Number(x), Number(y));
    };

    const update = () => {

        if (localStorage.getItem(playerX) == null || localStorage.getItem(playerY) == null) {
            load();
        }

        const {x, y} = position.getPosition();
    
        localStorage.setItem(playerX, x);
        localStorage.setItem(playerY, y);
    };

    return {
        load,
        actions: {
            update
        }
    };
};