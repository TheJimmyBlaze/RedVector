import { 
    Canvas,
    Camera,
    Game
} from 'titanium-ecs';

const gameCanvas = Canvas({
    elementId: 'gameCanvas',
    backgroundColour: 'SeaGreen'
});
const gameCamera = Camera({
    canvas: gameCanvas
});

const bonusCamera = Camera({
    canvas: gameCanvas,
});

const game = Game({
    entities: [
        gameCanvas,
        gameCamera,
        bonusCamera
    ]
});

export const run = () => {
    window.addEventListener('load', () => game.start());
}