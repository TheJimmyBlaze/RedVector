import { useEntity, usePosition, useSpriteSheet, useSpriteSheetRun } from 'titanium';

export const useTestProp = ({
    x, y,
    drawCamera
}) => {

    const name = 'test.prop';

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
        name,
        components: {
            position,
            sprite
        }
    });

    return {
        ...entity
    };
};