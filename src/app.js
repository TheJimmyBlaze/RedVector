
import './globals';

import { useGame } from 'titanium';

import { useGameView } from './view/gameView';

export const game = useGame();

export const init = () => {

    const view = useGameView();
    view.initialize();
};

export const start = async () => {
    
    init();

    game.start();
};

export const run = () => {
    window.addEventListener('load', () => start());
}