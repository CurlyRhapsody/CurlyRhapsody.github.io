import { useState, useEffect, useRef } from 'react';
import { ShadowedStack } from "../../styled/component";
import { getWindowMiddlePos, globalToLocal } from './utils';
import { ChartsXAxis } from '@mui/x-charts';

type PointCoord = { [tabUUID: string]: { x: number, y: number } };
type PointPerformance = { [tabUUID: string]: DOMHighResTimeStamp };

const TAB_ID = crypto.randomUUID();
const TAB_TIMEOUT = 100;

const BroadcastPlatform = () => {

    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    const [posMap, setPosMap] = useState<PointCoord>({});
    const [lastSeenMap, setLastSeenMap] = useState<PointPerformance>({});

    const posMapRef = useRef(posMap);
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
            if (context && canvas) {
                context?.clearRect(0, 0, canvas.width, canvas.height);
                drawArrows();
                drawPoints();
            }
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
            for (const id in posMap) {
                const remoteGlobal = posMap[id];
                const remoteLocal = globalToLocal(remoteGlobal.x, remoteGlobal.y);
                points.push({ x: remoteLocal.x, y: remoteLocal.y });
            }
    
            context.strokeStyle = 'black';
            context.lineWidth = 1;
            for (let i = 0; i < points.length; i++) {
                for (let j = i + 1; j < points.length; j++) {
                    context.beginPath();
                    context.moveTo(points[i].x, points[i].y);
                    context.lineTo(points[j].x, points[j].y);
                    context.stroke();
                }
            }
        }
    
        const drawPoints = () => {
            if (!context) return;
    
            const currentGlobal = getWindowMiddlePos();
            const currentLocal = globalToLocal(
                currentGlobal.x,
                currentGlobal.y
            );
        
            context.beginPath();
            context.arc(currentLocal.x, currentLocal.y, 10, 0, 2 * Math.PI);
            context.fillStyle = 'red';
            context.fill();
        
            for (const id in posMap) {
                const remoteGlobal = posMap[id];
        
                const remoteLocal = globalToLocal(
                    remoteGlobal.x,
                    remoteGlobal.y
                );
        
                context.beginPath();
                context.arc(remoteLocal.x, remoteLocal.y, 10, 0, 2 * Math.PI);
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
                position: "absolute", background: "#FFFFFF", borderRadius: "16px", p: "16px",
                width: "200px", height: "200px", minHeight: "200px", top: "calc(50% - 100px)"
            }}
        >
            <canvas ref={canvasRef} width="168px" height="168px"></canvas>
        </ShadowedStack>
    )
}

export default BroadcastPlatform;