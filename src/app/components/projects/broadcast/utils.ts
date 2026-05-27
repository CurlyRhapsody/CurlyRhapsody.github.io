export type Coord = { x: number, y: number };

export function getWindowMiddlePos() {
    return ({
        x: window.screenX + window.innerWidth / 2,
        y: window.screenY + window.outerHeight - window.innerHeight / 2,
    })
}

export function globalToLocal(globalX: number, globalY: number) {
    return ({
        x: globalX - window.screenX,
        y: globalY - window.screenY - window.outerHeight + window.innerHeight
    })
}

export function findAngleAndDelta(p1: Coord, p2: Coord, dist: number) {
    const angle = Math.atan2(p1.y - p2.y, p1.x - p2.x);
    const dx = dist * Math.cos(angle);
    const dy = dist * Math.sin(angle);
    return { angle, dx, dy }
}