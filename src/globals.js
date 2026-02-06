
import {
    useImage,
    useTexture,
    useFrameShader,
    useFrameProfiler
} from 'titanium';

import { useUiCanvas } from './camera/uiCanvas';
import { useGameCanvas } from './camera/gameCanvas';
import { useUiCamera } from './camera/uiCamera';
import { useGameCamera } from './camera/gameCamera';

export const gameCanvas = useGameCanvas();
export const uiCanvas = useUiCanvas();

export const gameCamera = useGameCamera({canvas: gameCanvas, scale: 0.1});
export const uiCamera = useUiCamera({canvas: uiCanvas, scale: 0.075});

export const profiler = useFrameProfiler();

export const images = {
    character: useImage('/sprites/character_sheet.png'),
    sword: useImage('/sprites/weapon_melee_sword_sheet.png'),
    bullet: useImage('/sprites/weapon_ranged_bullet_sheet.png'),
    rifle: useImage('/sprites/weapon_ranged_rifle_sheet.png'),
    lobby: useImage('/sprites/level_lobby.png')
};

export const textures = {
};

export const shaders = {
};