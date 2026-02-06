import { 
    useEntity, 
    usePosition, 
    useSpriteSheet, 
    useSpriteSheetRun, 
    useSpriteOptions,
    useRectCollider
} from 'titanium';

import { 
    gameCamera as drawCamera,
    images
} from '../globals';

import { useLinearTranslator } from './agitator/linearTranslator';

export const useLobby = () => {

    const position = usePosition({});
    
    const sprite = useSpriteSheet({
        image: images.lobby,
        sliceWidth: 1024,
        sliceHeight: 1024,
        runs: [
            useSpriteSheetRun({
                name: 'sprite'
            })
        ]
    }).sprite({
        position,
        camera: drawCamera,
        options: useSpriteOptions({
            zIndex: -1000
        })
    });

    const terrainCollider = [

        //Central pillar
        useRectCollider({
            position: usePosition({x: 0, y: 160}),
            width: 128, height: 128
        }),

        //Pillar door left
        useRectCollider({
            position: usePosition({x: -71, y: 152}),
            width: 14, height: 82
        }),
        useRectCollider({
            position: usePosition({x: -151, y: 152}),
            width: 14, height: 82
        }),

        //Pillar door right
        useRectCollider({
            position: usePosition({x: 72, y: 152}),
            width: 14, height: 82
        }),
        useRectCollider({
            position: usePosition({x: 152, y: 152}),
            width: 14, height: 82
        }),

        //Pillar desk
        useRectCollider({
            position: usePosition({x: 0, y: 271}),
            width: 86, height: 34
        }),
        useRectCollider({
            position: usePosition({x: -53, y: 264}),
            width: 22, height: 48
        }),
        useRectCollider({
            position: usePosition({x: 53, y: 264}),
            width: 22, height: 48
        }),

        //Stair rails
        useRectCollider({
            position: usePosition({x: 8, y: -48}),
            width: 16, height: 64
        }),
        useRectCollider({
            position: usePosition({x: 88, y: -48}),
            width: 16, height: 64
        }),
        useRectCollider({
            position: usePosition({x: 168, y: -48}),
            width: 16, height: 64
        }),

        //Stair desk
        useRectCollider({
            position: usePosition({x: -72, y: -48}),
            width: 18, height: 64
        }),
        useRectCollider({
            position: usePosition({x: -128, y: -41}),
            width: 98, height: 46
        }),

        //Monolith
        useRectCollider({
            position: usePosition({x: 0, y: -360}),
            width: 128, height: 112
        }),

        //Top walls
        useRectCollider({
            position: usePosition({x: 0, y: -460}),
            width: 64, height: 20
        }),
        useRectCollider({
            position: usePosition({x: -72, y: -458}),
            width: 80, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 72, y: -458}),
            width: 80, height: 20
        }),

        //Top Right Corridor
        useRectCollider({
            position: usePosition({x: 192, y: -384}),
            width: 160, height: 160
        }),
        useRectCollider({
            position: usePosition({x: 504, y: -296}),
            width: 16, height: 92
        }),
        useRectCollider({
            position: usePosition({x: 346, y: -121}),
            width: 341, height: 270
        }),

        //Top Left Corridor
        useRectCollider({
            position: usePosition({x: -216, y: -384}),
            width: 208, height: 160
        }),
        useRectCollider({
            position: usePosition({x: -392, y: -322}),
            width: 16, height: 136
        }),
        useRectCollider({
            position: usePosition({x: -380, y: -392}),
            width: 28, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -328, y: -392}),
            width: 20, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -352, y: -394}),
            width: 32, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -347, y: -121}),
            width: 342, height: 270
        }),

        //Elevators
        useRectCollider({
            position: usePosition({x: 289, y: -330}),
            width: 34, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 320, y: -332}),
            width: 32, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 352, y: -330}),
            width: 36, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 384, y: -332}),
            width: 32, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 416, y: -330}),
            width: 36, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 448, y: -332}),
            width: 32, height: 20
        }),
        useRectCollider({
            position: usePosition({x: 480, y: -330}),
            width: 36, height: 20
        }),

        //Bottom Right Corridor
        useRectCollider({
            position: usePosition({x: 360, y: 8}),
            width: 52, height: 16
        }),
        useRectCollider({
            position: usePosition({x: 424, y: 8}),
            width: 20, height: 16
        }),
        useRectCollider({
            position: usePosition({x: 440, y: 40}),
            width: 16, height: 64
        }),
        useRectCollider({
            position: usePosition({x: 238, y: 22}),
            width: 125, height: 20
        }),

        //Right Stairs
        useRectCollider({
            position: usePosition({x: 303, y: 28}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: 308, y: 26}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: 313, y: 24}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: 318, y: 22}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: 323, y: 20}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: 328, y: 18}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: 333, y: 16}),
            width: 4, height: 4
        }),

        //Bottom Left Corridor
        useRectCollider({
            position: usePosition({x: -260, y: 8}),
            width: 60, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -336, y: 8}),
            width: 36, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -416, y: 8}),
            width: 68, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -488, y: 8}),
            width: 20, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -504, y: 40}),
            width: 16, height: 64
        }),
        useRectCollider({
            position: usePosition({x: -190, y: 22}),
            width: 28, height: 20
        }),

        //Left Stairs
        useRectCollider({
            position: usePosition({x: -207, y: 28}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: -212, y: 26}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: -217, y: 24}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: -222, y: 22}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: -227, y: 20}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: -232, y: 18}),
            width: 4, height: 4
        }),
        useRectCollider({
            position: usePosition({x: -237, y: 16}),
            width: 4, height: 4
        }),

        //Entrance
        useRectCollider({
            position: usePosition({x: 0, y: 504}),
            width: 128, height: 16
        }),
        useRectCollider({
            position: usePosition({x: -339, y: 264}),
            width: 360, height: 400
        }),
        useRectCollider({
            position: usePosition({x: -113, y: 472}),
            width: 100, height: 80
        }),
        useRectCollider({
            position: usePosition({x: 299, y: 264}),
            width: 280, height: 400
        }),
        useRectCollider({
            position: usePosition({x: 113, y: 472}),
            width: 100, height: 80
        }),
    ];

    const linearTranslator = [

        //Centre stairs
        useLinearTranslator({
            position: usePosition({x: 46, y: -48}),
            width: 240, height: 36,
            translateYY: -0.3
        }),

        //Right stairs
        useLinearTranslator({
            position: usePosition({x: 318, y: 40}),
            width: 34, height: 64,
            translateYX: -0.3,
            translateXX: -0.2
        }),

        //Left stairs
        useLinearTranslator({
            position: usePosition({x: -222, y: 40}),
            width: 34, height: 64,
            translateYX: 0.3,
            translateXX: -0.2
        }),

        //Monolith stairs
        useLinearTranslator({
            position: usePosition({x: 0, y: -358}),
            width: 240, height: 84,
            translateYY: -0.3
        })
    ];

    const entity = useEntity({
        components: {
            position,
            sprite,
            terrainCollider,
            impulseField: linearTranslator
        }
    });

    return {
        ...entity
    };
};