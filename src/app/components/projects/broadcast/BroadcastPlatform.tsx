import { useState, useEffect, useRef } from 'react';
import { ShadowedStack } from "../../styled/component";
import { Coord, findAngleAndDelta, getWindowMiddlePos, globalToLocal } from './utils';

type PointCoord = { [tabUUID: string]: Coord };
type PointPerformance = { [tabUUID: string]: DOMHighResTimeStamp };

const TAB_ID = crypto.randomUUID();
const TAB_TIMEOUT = 100;

const BroadcastPlatform = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [posMap, setPosMap] = useState<PointCoord>({});
    const [lastSeenMap, setLastSeenMap] = useState<PointPerformance>({});

    const posMapRef = useRef(posMap);
    const coordsRef = useRef<PointCoord>({});
    useEffect(() => {
        posMapRef.current = posMap;
    }, [posMap]);

    useEffect(() => {
        const channel = new BroadcastChannel("curly-ctb-demo");
        const canvas: HTMLCanvasElement | null = canvasRef.current;
        if (!canvas) return;
        const context = canvas?.getContext("2d");

        let animationFrameId: number;

        const post = () => {
            const { x, y } = getWindowMiddlePos();
            channel.postMessage({ tabId: TAB_ID, x, y })
        }
    
        const period = () => {
            if (!context || !canvas) return;
            context?.clearRect(0, 0, 168, 168);
            drawArrows();
            drawPoints();
            animationFrameId = requestAnimationFrame(period);
        }
    
        const drawArrows = () => {
            if (!context) return;
    
            const currentGlobal = getWindowMiddlePos();
            const currentLocal = globalToLocal(
                currentGlobal.x,
                currentGlobal.y
            );
    
            const points = [{ x: currentLocal.x, y: currentLocal.y }];

            const currentPosMap = posMapRef.current;
            for (const id in currentPosMap) {
                const remoteGlobal = currentPosMap[id];
                const remoteLocal = globalToLocal(remoteGlobal.x, remoteGlobal.y);
                points.push({ x: remoteLocal.x, y: remoteLocal.y });
            }
    
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            for (let j = 1; j < points.length; j++) {

                const { angle, dx, dy } = findAngleAndDelta(points[j], points[0], 60);
                const { endX, endY } = { endX: 84 + dx, endY: 84 + dy };

                context.beginPath();
                context.moveTo(84, 84);
                context.lineTo(endX,endY);
                context.lineTo(
                    endX - 10 * Math.cos(angle - Math.PI / 9),
                    endY - 10 * Math.sin(angle - Math.PI / 9)
                );
                context.moveTo(endX,endY);
                context.lineTo(
                    endX - 10 * Math.cos(angle + Math.PI / 9),
                    endY - 10 * Math.sin(angle + Math.PI / 9)
                );
                context.stroke();
            }
        }
    
        const drawPoints = () => {
            if (!context) return;

            context.beginPath();
            context.arc(84, 84, 10, 0, 2 * Math.PI);
            context.fillStyle = 'red';
            context.fill();

            const currentGlobal = getWindowMiddlePos();
            const currentLocal = globalToLocal(
                currentGlobal.x,
                currentGlobal.y
            );
        
            const currentPosMap = posMapRef.current;
            for (const id in currentPosMap) {
                const remoteGlobal = currentPosMap[id];

                console.log(remoteGlobal);
        
                const remoteLocal = globalToLocal(
                    remoteGlobal.x,
                    remoteGlobal.y
                );
        
                context.beginPath();
                context.arc(
                    remoteLocal.x - (currentLocal.x - 84),
                    remoteLocal.y - (currentLocal.y - 84),
                    10, 0, 2 * Math.PI
                );
                context.fillStyle = 'blue';
                context.fill();
            }
        }
    
        const cleanupDeadTabs = () => {
            const now = performance.now();
        
            setLastSeenMap(prevLastSeen => {
                const updatedLastSeen = { ...prevLastSeen };
                let changed = false;

                for (const id in updatedLastSeen) {
                    if (now - updatedLastSeen[id] > TAB_TIMEOUT) {
                        delete coordsRef.current[id];
                        delete updatedLastSeen[id];
                        changed = true;
                        
                        setPosMap(prevPos => {
                            const updatedPos = { ...prevPos };
                            delete updatedPos[id];
                            return updatedPos;
                        });
                    }
                }
                return changed ? updatedLastSeen : prevLastSeen;
            });
        }

        const handleMessage = (event: MessageEvent) => {
            if (event.data.tabId === TAB_ID) return;

            coordsRef.current[event.data.tabId] = { x: event.data.x, y: event.data.y };

            setPosMap(prev => ({ ...prev, [event.data.tabId]: { x: event.data.x, y: event.data.y } }));
            setLastSeenMap(prev => ({ ...prev, [event.data.tabId]: performance.now() }));
        }

        channel.addEventListener("message", handleMessage);
        period();
        const postInterval = setInterval(post, 10);
        const cleanupInterval = setInterval(cleanupDeadTabs, 100);

        return () => {
            channel.removeEventListener("message", handleMessage);
            channel.close();
            cancelAnimationFrame(animationFrameId);
            clearInterval(postInterval);
            clearInterval(cleanupInterval);
        };
    }, []);

    return (
        <ShadowedStack
            sx={{
                position: "absolute", background: "#FFFFFF", borderRadius: "16px", padding: "16px",
                width: "200px", height: "200px", minHeight: "200px", top: "calc(50% - 100px)",
                zIndex: 200
            }}
        >
            <canvas ref={canvasRef} width="168px" height="168px"></canvas>
        </ShadowedStack>
    )
}

export default BroadcastPlatform;