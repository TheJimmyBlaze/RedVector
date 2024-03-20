import { input } from 'titanium';

//UI
input.setBind({
    alias: 'menu',
    primary: {
        key: 'Escape'
    }
});
input.setBind({
    alias: 'debug',
    primary: {
        key: 'Backslash'
    }
});

//Movement
input.setBind({
    alias: 'up',
    primary: {
        key: 'KeyW'
    },
    secondary: {
        key: 'ArrowUp'
    }
});
input.setBind({
    alias: 'down',
    primary: {
        key: 'KeyS'
    },
    secondary: {
        key: 'ArrowDown'
    }
});
input.setBind({
    alias: 'left',
    primary: {
        key: 'KeyA'
    },
    secondary: {
        key: 'ArrowLeft'
    }
});
input.setBind({
    alias: 'right',
    primary: {
        key: 'KeyD'
    },
    secondary: {
        key: 'ArrowRight'
    }
});

//Weapon
input.setBind({
    alias: 'weaponOne',
    primary: {
        key: 'Digit1'
    }
});
input.setBind({
    alias: 'weaponTwo',
    primary: {
        key: 'Digit2'
    }
});
input.setBind({
    alias: 'weaponAttack',
    primary: {
        mouseButton: 0
    }
});
input.setBind({
    alias: 'weaponAim',
    primary: {
        mouseButton: 2
    }
});
