import { 
    useEntity, 
    usePosition, 
    useSpriteSheet, 
    useSpriteSheetRun, 
    useSpriteOptions,
    useRectCollider
 } from 'titanium';

export const useLobby = ({
    x, y,
    drawCamera
}) => {

    const position = usePosition({x, y});
    
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
            drawCamera
        }),

        //Pillar door left
        useRectCollider({
            position: usePosition({x: -71, y: 152}),
            width: 14, height: 82,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: -151, y: 152}),
            width: 14, height: 82,
            drawCamera
        }),

        //Pillar door right
        useRectCollider({
            position: usePosition({x: 72, y: 152}),
            width: 14, height: 82,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 152, y: 152}),
            width: 14, height: 82,
            drawCamera
        }),

        //Pillar desk
        useRectCollider({
            position: usePosition({x: 0, y: 271}),
            width: 86, height: 34,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: -53, y: 264}),
            width: 22, height: 48,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 53, y: 264}),
            width: 22, height: 48,
            drawCamera
        }),

        //Stair rails
        useRectCollider({
            position: usePosition({x: 8, y: -48}),
            width: 16, height: 64,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 88, y: -48}),
            width: 16, height: 64,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 168, y: -48}),
            width: 16, height: 64,
            drawCamera
        }),

        //Stair desk
        useRectCollider({
            position: usePosition({x: -74, y: -48}),
            width: 22, height: 64,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: -130, y: -40}),
            width: 94, height: 48,
            drawCamera
        }),

        //Monolith
        useRectCollider({
            position: usePosition({x: 0, y: -360}),
            width: 128, height: 112,
            drawCamera
        }),

        //Top walls
        useRectCollider({
            position: usePosition({x: 0, y: -460}),
            width: 64, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: -72, y: -458}),
            width: 80, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 72, y: -458}),
            width: 80, height: 20,
            drawCamera
        }),

        //Top Right Corridor
        useRectCollider({
            position: usePosition({x: 192, y: -384}),
            width: 160, height: 160,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 506, y: -296}),
            width: 20, height: 92,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 345, y: -121}),
            width: 340, height: 270,
            drawCamera
        }),

        //Elevators
        useRectCollider({
            position: usePosition({x: 289, y: -330}),
            width: 34, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 320, y: -332}),
            width: 32, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 352, y: -330}),
            width: 36, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 384, y: -332}),
            width: 32, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 416, y: -330}),
            width: 36, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 448, y: -332}),
            width: 32, height: 20,
            drawCamera
        }),
        useRectCollider({
            position: usePosition({x: 480, y: -330}),
            width: 36, height: 20,
            drawCamera
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