import { Box, Stack, Typography } from "@mui/material";
import { getNumberColor, ROULETTE_NUMBERS } from "./utils";



const Roulette = ({
    degreesPerSegment,
    marbleRotation,
    wheelRotation,
    hasSpun
}: {
    degreesPerSegment: number;
    marbleRotation: number;
    wheelRotation: number;
    hasSpun: boolean;
}) => {

    console.log(marbleRotation, wheelRotation)

    return (
        <Box sx={{ position: 'relative', width: "30rem", height: "30rem" }}>
            <Box 
                sx={{ 
                    position: "absolute", 
                    inset: 0, 
                    borderRadius: '50%', 
                    overflow: 'hidden', 
                    backgroundColor: '#111', 
                    border: '1.5rem solid #1E1E1E', 
                    boxShadow: '0 0 0.625rem #00000066' 
                }}
            />
            
            <Box sx={{
                position: "absolute",
                inset: "2rem",
                borderRadius: '50%',
                overflow: 'hidden',
                transform: `rotate(${wheelRotation}deg)`,
                transition: 'transform 4s cubic-bezier(0.1, 0.4, 0.1, 1)', 
            }}>
                <Box sx={{ position: 'relative', width: '100%', height: '100%'}}>
                    {ROULETTE_NUMBERS.map((num, idx) => {
                        const currentAngle = idx * degreesPerSegment;
                        return (
                            <Box 
                                key={idx}
                                sx={{ 
                                    position: "absolute", 
                                    width: "100%", 
                                    height: "100%",
                                    transformOrigin: '50% 50%',
                                    transform: `rotate(${currentAngle}deg)`,
                                    backgroundColor: getNumberColor(num),
                                    clipPath: 'polygon(50% 50%, 45.7% 0%, 54.3% 0%)'
                                }}
                            >
                                {/* Text Overlay Wrapper */}
                                <Stack 
                                    sx={{ 
                                        position: "absolute", 
                                        top: "1rem", 
                                        left: "50%", 
                                        transform: `translateX(-50%) rotate(${degreesPerSegment / 2}deg)`,
                                        flexDirection: 'column', 
                                        alignItems: 'center' 
                                    }}
                                >
                                    <Typography
                                        sx={{ 
                                            color: '#FFFFFF', 
                                            fontSize: '1rem', 
                                            fontWeight: 'bold',
                                            textShadow: '0.0625rem 0.0625rem 0.125rem #000000CC'
                                        }}
                                    >
                                        {num}
                                    </Typography>
                                </Stack>
                            </Box>
                        );
                    })}
                    
                    {/* Inner Ring Spacer */}
                    <Box 
                        sx={{ 
                            position: "absolute", 
                            inset: "3.75rem",
                            borderRadius: '50%', 
                            border: '0.5rem solid #3E2723',
                            background: "#171717" 
                        }} 
                    />
                </Box>

                {/* THE MARBLE TRACK: Spins and lands directly on top of the picked number */}
                <Box 
                    sx={{ 
                        position: "absolute", 
                        inset: "0.833rem", 
                        borderRadius: '50%', 
                        transformOrigin: '50% 50%', 
                        transform: `rotate(${marbleRotation}deg)`, 
                        transition: 'transform 4s cubic-bezier(0.1, 0.4, 0.1, 1)', 
                        pointerEvents: 'none',
                        zIndex: 10,
                        opacity: hasSpun ? 1 : 0,
                    }}
                >
                    {/* The physical marble ball */}
                    <Box 
                        sx={{ 
                            position: "absolute", 
                            top: "2rem", 
                            left: '50%', 
                            transform: 'translateX(-50%)', 
                            width: "1.167rem", 
                            height: "1.167rem", 
                            borderRadius: '50%', 
                            backgroundColor: '#ffffff', 
                            boxShadow: '0 0.125rem 0.25rem #00000099'
                        }}
                    />
                </Box>

                {/* Completely Stationary Center Hub Cap */}
                <Box 
                    sx={{ 
                        position: "absolute", 
                        inset: "10.833rem", 
                        borderRadius: '50%', 
                        backgroundColor: '#8D6E63', 
                        border: '0.333rem solid #2D1A12', 
                        boxShadow: 'inset 0px 0px 10px rgba(0,0,0,0.5)',
                        zIndex: 5
                    }} 
                />
            </Box>
        </Box>
    )
}

export default Roulette;