import { input } from 'titanium';

export const binds = {

    //UI
    menu: 'menu',
    debug: 'debug',

    //Movement
    sprint: 'move.sprint',
    dive: 'move.dive',
    moveUp: 'move.up',
    moveDown: 'move.down',
    moveLeft: 'move.left',
    moveRight: 'move.right',

    //Weapon
    weaponOne: 'weapon.one',
    weaponTwo: 'weapon.two',
    weaponAttack: 'weapon.attack',
    weaponAim: 'weapon.aim'
};

//UI
input.setBind({
    alias: binds.menu,
    primary: {
        key: 'Escape'
    }
});
input.setBind({
    alias: binds.debug,
    primary: {
        key: 'Backslash'
    }
});

//Movement
input.setBind({
    alias: binds.sprint,
    primary: {
        key: 'ShiftLeft'
    }
});
input.setBind({
    alias: binds.dive,
    primary: {
        key: 'Space'
    }
});
input.setBind({
    alias: binds.moveUp,
    primary: {
        key: 'KeyW'
    },
    secondary: {
        key: 'ArrowUp'
    }
});
input.setBind({
    alias: binds.moveDown,
    primary: {
        key: 'KeyS'
    },
    secondary: {
        key: 'ArrowDown'
    }
});
input.setBind({
    alias: binds.moveLeft,
    primary: {
        key: 'KeyA'
    },
    secondary: {
        key: 'ArrowLeft'
    }
});
input.setBind({
    alias: binds.moveRight,
    primary: {
        key: 'KeyD'
    },
    secondary: {
        key: 'ArrowRight'
    }
});

//Weapon
input.setBind({
    alias: binds.weaponOne,
    primary: {
        key: 'Digit1'
    }
});
input.setBind({
    alias: binds.weaponTwo,
    primary: {
        key: 'Digit2'
    }
});
input.setBind({
    alias: binds.weaponAttack,
    primary: {
        mouseButton: 0
    }
});
input.setBind({
    alias: binds.weaponAim,
    primary: {
        mouseButton: 2
    }
});
