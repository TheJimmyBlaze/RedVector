import { useEntity, usePosition, useSpriteSheet, useSpriteSheetRun } from 'titanium';

export const useTestProp = ({
    x, y,
    drawCamera
}) => {

    const position = usePosition({x, y});
    
    const sprite = useSpriteSheet({
        imagePath: 'sprites/forest_prop_sheet.png',
        sliceWidth: 32,
        sliceHeight: 32,
        runs: [
            useSpriteSheetRun({
                name: 'tree'
            })
        ]
    }).tree({
        position,
        camera: drawCamera
    });

    const entity = useEntity({
        components: {
            position,
            sprite
        }
    });

    return {
        ...entity
    };
};