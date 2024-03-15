import { 
    useCanvas,
    useCamera,
    useGame
} from 'titanium-ecs';

const gameCanvas = useCanvas({
    elementId: 'gameCanvas'
});
const gameCamera = useCamera({
    canvas: gameCanvas,
    backgroundColour: 'red'
});

const game = useGame({
    entities: [
        gameCamera
    ]
});

export const run = () => {
    window.addEventListener('load', () => game.start());
}