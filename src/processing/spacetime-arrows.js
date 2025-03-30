export function addSpaceTimeArrows(data, gridSize, above) {
    data.arrows = data.arrows ?? [];

    const spaceY = above ? -0.2 : gridSize + 0.2;
    const spaceTextY = above ? spaceY - 0.15 : spaceY + 0.15;

    data.arrows.push(...[{
        wayPoints: [[spaceY, gridSize / 2 - 0.5], [spaceY, gridSize]],
        headLength: 0.125,
        color: "#000000",
        thickness: 1.28,
        target: "overlay",
    }, {
        wayPoints: [[spaceY, gridSize / 2 + 0.5], [spaceY, 0]],
        headLength: 0.125,
        color: "#000000",
        thickness: 1.28,
        target: "overlay",
    }, {
        wayPoints: [[0, gridSize + 0.2], [gridSize, gridSize + 0.2]],
        headLength: 0.125,
        color: "#000000",
        thickness: 1.28,
        target: "overlay",
    }]);

    data.overlays = data.overlays || [];
    data.overlays.push(...[
        {
            "center": [
                spaceTextY,
                gridSize / 2
            ],
            "width": 0,
            "height": 0.504,
            "stroke": "#ffffff",
            "text": "Space",
            "fontSize": 13,
            "color": "#000000",
            "angle": 0,
            "rounded": true
        },
        {
            "center": [
                gridSize / 2,
                gridSize + 0.35
            ],
            "width": 0,
            "height": 0.504,
            "stroke": "#ffffff",
            "text": "Time",
            "fontSize": 13,
            "color": "#000000",
            "angle": 90,
            "rounded": true
        }
    ]);
}