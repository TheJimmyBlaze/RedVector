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
registry.register({ entity: gameCamera, priority: 9998 });
registry.register({ entity: uiCamera, priority: 9999 });
registry.register({ entity: canvas, priority: 9997});

export const run = () => {
    window.addEventListener('load', () => game.start());
}