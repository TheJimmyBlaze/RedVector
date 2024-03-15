import { 
    Canvas,
    Camera,
    Debug,
    registry,
    Game
} from 'titanium-ecs';

const canvas = Canvas({
    elementId: 'canvas',
    backgroundColour: 'SeaGreen'
});

const gameCamera = Camera({
    canvas: canvas
});

const uiCamera = Camera({
    canvas: canvas
});

const debug = Debug({
    camera: uiCamera
});

const game = Game();

registry.register({ entity: debug });
registry.register({ entity: canvas});
registry.register({ entity: gameCamera });
registry.register({ entity: uiCamera });

export const run = () => {
    window.addEventListener('load', () => game.start());
}