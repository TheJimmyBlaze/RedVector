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
    debugColliderCameraProxy as colliderProxy
} from '../app';

export const useLobby = () => {

    const position = usePosition({});
    
    const sprite = useSpriteSheet({
        imagePath: 'sprites/level_lobby.png',
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
            width: 128, height: 128,
            drawCamera: colliderProxy
        }),

        //Pillar door left
        useRectCollider({
            position: usePosition({x: -71, y: 152}),
            width: 14, height: 82,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -151, y: 152}),
            width: 14, height: 82,
            drawCamera: colliderProxy
        }),

        //Pillar door right
        useRectCollider({
            position: usePosition({x: 72, y: 152}),
            width: 14, height: 82,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 152, y: 152}),
            width: 14, height: 82,
            drawCamera: colliderProxy
        }),

        //Pillar desk
        useRectCollider({
            position: usePosition({x: 0, y: 271}),
            width: 86, height: 34,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -53, y: 264}),
            width: 22, height: 48,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 53, y: 264}),
            width: 22, height: 48,
            drawCamera: colliderProxy
        }),

        //Stair rails
        useRectCollider({
            position: usePosition({x: 8, y: -48}),
            width: 16, height: 64,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 88, y: -48}),
            width: 16, height: 64,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 168, y: -48}),
            width: 16, height: 64,
            drawCamera: colliderProxy
        }),

        //Stair desk
        useRectCollider({
            position: usePosition({x: -72, y: -48}),
            width: 18, height: 64,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -128, y: -41}),
            width: 98, height: 46,
            drawCamera: colliderProxy
        }),

        //Monolith
        useRectCollider({
            position: usePosition({x: 0, y: -360}),
            width: 128, height: 112,
            drawCamera: colliderProxy
        }),

        //Top walls
        useRectCollider({
            position: usePosition({x: 0, y: -460}),
            width: 64, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -72, y: -458}),
            width: 80, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 72, y: -458}),
            width: 80, height: 20,
            drawCamera: colliderProxy
        }),

        //Top Right Corridor
        useRectCollider({
            position: usePosition({x: 192, y: -384}),
            width: 160, height: 160,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 504, y: -296}),
            width: 16, height: 92,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 346, y: -121}),
            width: 341, height: 270,
            drawCamera: colliderProxy
        }),

        //Top Left Corridor
        useRectCollider({
            position: usePosition({x: -216, y: -384}),
            width: 208, height: 160,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -392, y: -322}),
            width: 16, height: 136,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -380, y: -392}),
            width: 28, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -328, y: -392}),
            width: 20, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -352, y: -394}),
            width: 32, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -347, y: -121}),
            width: 342, height: 270,
            drawCamera: colliderProxy
        }),

        //Elevators
        useRectCollider({
            position: usePosition({x: 289, y: -330}),
            width: 34, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 320, y: -332}),
            width: 32, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 352, y: -330}),
            width: 36, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 384, y: -332}),
            width: 32, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 416, y: -330}),
            width: 36, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 448, y: -332}),
            width: 32, height: 20,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 480, y: -330}),
            width: 36, height: 20,
            drawCamera: colliderProxy
        }),

        //Bottom Right Corridor
        useRectCollider({
            position: usePosition({x: 360, y: 8}),
            width: 52, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 424, y: 8}),
            width: 20, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 440, y: 40}),
            width: 16, height: 64,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 238, y: 22}),
            width: 125, height: 20,
            drawCamera: colliderProxy
        }),

        //Right Stairs
        useRectCollider({
            position: usePosition({x: 303, y: 28}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 308, y: 26}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 313, y: 24}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 318, y: 22}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 323, y: 20}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 328, y: 18}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 333, y: 16}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),

        //Bottom Left Corridor
        useRectCollider({
            position: usePosition({x: -260, y: 8}),
            width: 60, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -336, y: 8}),
            width: 36, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -416, y: 8}),
            width: 68, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -488, y: 8}),
            width: 20, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -504, y: 40}),
            width: 16, height: 64,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -190, y: 22}),
            width: 28, height: 20,
            drawCamera: colliderProxy
        }),

        //Left Stairs
        useRectCollider({
            position: usePosition({x: -207, y: 28}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -212, y: 26}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -217, y: 24}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -222, y: 22}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -227, y: 20}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -232, y: 18}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -237, y: 16}),
            width: 4, height: 4,
            drawCamera: colliderProxy
        }),

        //Entrance
        useRectCollider({
            position: usePosition({x: 0, y: 504}),
            width: 128, height: 16,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -339, y: 264}),
            width: 360, height: 400,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: -113, y: 472}),
            width: 100, height: 80,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 299, y: 264}),
            width: 280, height: 400,
            drawCamera: colliderProxy
        }),
        useRectCollider({
            position: usePosition({x: 113, y: 472}),
            width: 100, height: 80,
            drawCamera: colliderProxy
        }),
    ];

    const entity = useEntity({
        components: {
            position,
            sprite,
            terrainCollider
        }
    });

    return {
        ...entity
    };
};