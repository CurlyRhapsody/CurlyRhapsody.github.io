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